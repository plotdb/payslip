(->

  nhi = {}
  Papa.parse "assets/data/nhi-110-boss.csv", do
    download: true
    header: true
    dynamicTyping: true
    complete: (ret) ->
      nhi.boss = ret.data
      nhi.boss.sort (a, b) -> a.salary - b.salaray
      calc!

  Papa.parse "assets/data/nhi-110-worker.csv", do
    download: true
    header: true
    dynamicTyping: true
    complete: (ret) ->
      nhi.worker = ret.data
      nhi.worker.sort (a, b) -> a.salary - b.salaray
      calc!

  el = {}
  rates = do
    "bli-idv": 0.2
    "bli-com": 0.7
    "bli-gov": 0.1
    "普通保費": 0.105
    "就業保費": 0.01
    "工資墊償": 0.025 * 0.01

  [
    "salary",           # 投保薪資
    "family-count",     # 眷口數 ( 0 ~ 3, 不含自己 )
    "is-boss",          # 雇主 ( true or false )
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
  ]
    .map (name) ->
      el[name] = ld$.find(document, "*[data-var=#name]", 0)

  el.salary.addEventListener \keyup, -> calc!
  el["family-count"].addEventListener \change, -> calc!
  el["is-boss"].addEventListener \click, -> calc!
  el["is-boss"].addEventListener \input, -> calc!
  el["disaster-rate"].addEventListener \input, -> calc!
  calc = ->
    salary = +el.salary.value
    is-boss = el["is-boss"].checked
    blis = [rates["普通保費"], rates["就業保費"], +el["disaster-rate"].value * 0.01].map -> salary * it
    v = (blis.0 + (if is-boss => 0 else blis.1))
    el["bli-idv"].value = minus = Math.round(v * rates["bli-idv"])
    el["bli-com"].value = Math.round(v * rates["bli-com"]) + Math.round(blis.2)
    el["bli-salary"].value = (if is-boss => 0 else Math.round(salary * rates["工資墊償"]))
    el["bli-ret"].value = Math.round(salary * 0.06)
    el.bli.value = (+el["bli-idv"].value) + (+el["bli-com"].value) + (+el["bli-salary"].value)
    data = if is-boss => nhi.boss else nhi.worker
    if data =>
      for i from data.length - 1 to 0 by -1  =>
        obj = data[i]
        if !(obj.salary?) or obj.salary > salary => continue
        family-count = +el["family-count"].value
        v1 = obj["p#{family-count}"]
        v2 = obj["com"] or 0
        el["nhi-idv"].value = v1
        el["nhi-com"].value = v2
        el["nhi"].value = v1 + v2
        minus += v1
        break
    el["pay"].value = salary - minus
    el["bill-total"].value = [el["nhi"].value, el["bli"].value, el["bli-ret"].value].reduce(((a,b) -> a + +b),0)

  calc!
)!
