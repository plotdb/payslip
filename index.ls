(->

  nhi = {}
  Papa.parse "data/nhi-108-boss.csv", do
    download: true
    header: true
    dynamicTyping: true
    complete: (ret) ->
      nhi.boss = ret.data
      nhi.boss.sort (a, b) -> a.salary - b.salaray
      calc!

  Papa.parse "data/nhi-109-worker.csv", do
    download: true
    header: true
    dynamicTyping: true
    complete: (ret) ->
      nhi.worker = ret.data
      nhi.worker.sort (a, b) -> a.salary - b.salaray
      calc!

  el = {}
  <[salary family-count is-boss pay bli-idv bli-com bli-ret bli nhi-idv nhi-com nhi]>.map (name) ->
    el[name] = ld$.find(document, "*[data-var=#name]", 0)

  el.salary.addEventListener \keyup, -> calc!
  el["family-count"].addEventListener \change, -> calc!
  el["is-boss"].addEventListener \click, -> calc!
  calc = ->
    salary = +el.salary.value
    is-boss = el["is-boss"].checked
    blis = [10, 1, 0.18].map -> salary * it * 0.01
    v = (blis.0 + (if is-boss => 0 else blis.1))
    el["bli-idv"].value = minus = Math.round(v * 0.2)
    el["bli-com"].value = Math.round(v * 0.7) + Math.round(blis.2)
    el["bli-ret"].value = Math.round(salary * 0.06)
    el.bli.value = (+el["bli-idv"].value) + (+el["bli-com"].value)
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

  calc!
)!
