<-(->it.apply {}) _

[nhi, bli, el] = [{}, {}, {}]
rates = do
  "bli-idv": 0.2
  "bli-com": 0.7
  "bli-gov": 0.1
  "nhi-2nd": 0.0211
  "普通保費": 0.11
  "就業保費": 0.01
  "工資墊償": 0.025 * 0.01

@rates = {} <<< rates

parse = (year) ~>
  p1 = new Promise (res, rej) ~>
    Papa.parse "assets/data/nhi-#{year}-boss.csv", do
      download: true
      header: true
      dynamicTyping: true
      complete: (ret) ->
        nhi.boss = ret.data
        nhi.boss.sort (a, b) -> a.salary - b.salaray
        res!
  p2 = new Promise (res, rej) ~> 
    Papa.parse "assets/data/nhi-#{year}-worker.csv", do
      download: true
      header: true
      dynamicTyping: true
      complete: (ret) ->
        nhi.worker = ret.data
        nhi.worker.sort (a, b) -> a.salary - b.salaray
        res!

  p3 = new Promise (res, rej) ~> 
    Papa.parse "assets/data/bli-#{year}.csv", do
      download: true
      header: true
      dynamicTyping: true
      complete: (ret) ->
        bli.worker = ret.data.filter -> it.salary
        bli.worker.sort (a, b) -> a.salary - b.salaray
        res!

  Promise.all [p1, p2, p3]

prepare = (year) ~>
  ld$.find(document, "*[data-var=year]", 0).value = year
  parse year
    .then -> ld$.fetch "/assets/data/#year.json", {method: "GET"}, {type: \json}
    .then ~>
      @rates = {} <<< rates <<< it
      el["salary"].value = @rates["最低薪資"]
      el["salary"].setAttribute \placeholder, "#{year}年最低薪資為#{@rates["最低薪資"]}元"
      el["disaster-rate"].value = @rates["職災費率"]
    .then -> calc!
[
  "year",             # 年度
  "salary",           # 投保薪資
  "family-count",     # 眷口數 ( 0 ~ 3, 不含自己 )
  "is-boss",          # 雇主 ( true or false )
  "bonus-4timed",     # 是否已有先前獎金超過四倍薪資
  "pay",              # 實領薪資
  "bli-idv",          # 勞保/個人負擔
  "bli-com",          # 勞保/公司負擔
  "bli-salary",       # 勞保/工資墊償基金(公司全額負擔)
  "bli",              # 勞保(個人+公司+工資墊償基金)
  "bli-ret",          # 勞退(單位提撥)
  "nhi-idv",          # 健保/個人負擔
  "nhi-com",          # 健保/公司負擔
  "nhi",              # 健保(個人+公司)
  "disaster-rate",    # 職災費率
  "bill-total",       # 帳單合計
  "prize",            # 獎金
  "prize-minus",      # 用於計算獎金之投保薪資
  "prize-pretax",     # 獎金代扣所得稅
  "prize-nhi1",       # 獎金代扣二代健保
  "prize-nhi2",       # 獎金 - 公司負擔二代健保
  "prize-real",       # 獎金 - 實領 (減去代扣所得稅與二代健保)
  "prize-spend",      # 針對獎金, 公司的實際支出
]
  .map (name) ->
    el[name] = ld$.find(document, "*[data-var=#name]", 0)

el.salary.addEventListener \keyup, -> calc!
el["family-count"].addEventListener \change, -> calc!
el["is-boss"].addEventListener \click, -> calc!
el["is-boss"].addEventListener \input, -> calc!
el["bonus-4timed"].addEventListener \click, -> prize-calc!
el["bonus-4timed"].addEventListener \input, -> prize-calc!
el["disaster-rate"].addEventListener \input, -> calc!
el["year"].addEventListener \change, -> prepare el["year"].value
el["prize"].addEventListener \keyup, -> prize-calc!
el["prize-minus"].addEventListener \keyup, -> prize-calc!
prize-calc = ->
  prize = +(el["prize"].value or 0)
  prize-minus = +(el["prize-minus"].value or 0) * 4
  if el["bonus-4timed"].checked => prize-minus = 0
  # https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=G0320030&flno=5
  # `各種所得扣繳金額小數四捨五入或捨去?` ->  一律收至元為止，角以下免收
  el["prize-pretax"].value = pretax = Math.floor(prize * 0.05)
  # https://law.lia-roc.org.tw/Law/Content?lsid=FL014029&bp=3
  # https://www.nhi.gov.tw/ch/cp-2947-71ec6-3150-1.html
  # 保險費之繳納，以元為單位，角以下4捨5入
  el["prize-nhi1"].value = nhi1 = Math.round(((prize - prize-minus) >? 0) * rates["nhi-2nd"])
  el["prize-nhi2"].value = nhi2 = Math.round(prize * rates["nhi-2nd"])
  el["prize-real"].value = prize - pretax - nhi1
  el["prize-spend"].value = prize + nhi2

calc = ~>
  salary = +el.salary.value
  is-boss = el["is-boss"].checked
  bli-salary = (bli.worker.filter(-> it.salary >= salary).0 or bli.worker[* - 1]).salary
  nhi-used = if is-boss => nhi.boss else nhi.worker
  nhi-salary = (nhi-used.filter(->it.salary >= salary).0 or nhi-used[* - 1]).salary

  moddiv = document.querySelector '[ld="nhi-boss-salary-mod"]'
  nhisalarydiv = document.querySelector '[ld="nhi-salary"]'
  moddiv.classList.toggle \d-none, true
  if @rates["雇主健保最低投保薪資"]? and is-boss and nhi-salary < @rates["雇主健保最低投保薪資"] =>
    nhi-salary = @rates["雇主健保最低投保薪資"]
    moddiv.classList.toggle \d-none, false
    nhisalarydiv.textContent = nhi-salary

  blis = [@rates["普通保費"], @rates["就業保費"], +el["disaster-rate"].value * 0.01].map -> bli-salary * it

  bli-idv-basic = Math.round(blis.0 * @rates["bli-idv"])
  bli-idv-disaster = Math.round((if is-boss => 0 else blis.1) * @rates["bli-idv"])
  bli-com-basic = Math.round(blis.0 * @rates["bli-com"])
  bli-com-disaster = Math.round((if is-boss => 0 else blis.1) * @rates["bli-com"])
  bli-com-job = Math.round(blis.2)

  el["bli-idv"].value = minus = ( bli-idv-basic + bli-idv-disaster)
  el["bli-com"].value = ( bli-com-basic + bli-com-disaster + bli-com-job )

  #v = (blis.0 + (if is-boss => 0 else blis.1))
  #el["bli-idv"].value = minus = Math.round(v * @rates["bli-idv"])
  #el["bli-com"].value = Math.round(v * @rates["bli-com"]) + Math.round(blis.2)
  el["bli-salary"].value = (if is-boss => 0 else Math.round(salary * @rates["工資墊償"]))
  el["bli-ret"].value = if is-boss => 0 else Math.round(salary * 0.06)

  el.bli.value = (+el["bli-idv"].value) + (+el["bli-com"].value) + (+el["bli-salary"].value)
  data = if is-boss => nhi.boss else nhi.worker
  if data =>
    for i from data.length - 1 to 0 by -1  =>
      obj = data[i]
      if !(obj.salary?) or obj.salary > nhi-salary => continue
      family-count = +el["family-count"].value
      v1 = obj["p#{family-count}"]
      v2 = obj["com"] or 0
      el["nhi-idv"].value = v1
      el["nhi-com"].value = v2
      el["nhi"].value = v1 + v2
      minus += v1
      console.log nhi-salary
      break
  el["pay"].value = salary - minus
  el["bill-total"].value = [el["nhi"].value, el["bli"].value, el["bli-ret"].value].reduce(((a,b) -> a + +b),0)


prepare 114
