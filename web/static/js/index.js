(function(){
  var nhi, el, rates, calc;
  nhi = {};
  Papa.parse("assets/data/nhi-110-boss.csv", {
    download: true,
    header: true,
    dynamicTyping: true,
    complete: function(ret){
      nhi.boss = ret.data;
      nhi.boss.sort(function(a, b){
        return a.salary - b.salaray;
      });
      return calc();
    }
  });
  Papa.parse("assets/data/nhi-110-worker.csv", {
    download: true,
    header: true,
    dynamicTyping: true,
    complete: function(ret){
      nhi.worker = ret.data;
      nhi.worker.sort(function(a, b){
        return a.salary - b.salaray;
      });
      return calc();
    }
  });
  el = {};
  rates = {
    "bli-idv": 0.2,
    "bli-com": 0.7,
    "bli-gov": 0.1,
    "普通保費": 0.105,
    "就業保費": 0.01,
    "工資墊償": 0.025 * 0.01
  };
  ["salary", "family-count", "is-boss", "pay", "bli-idv", "bli-com", "bli-salary", "bli", "bli-ret", "nhi-idv", "nhi-com", "nhi", "disaster-rate"].map(function(name){
    return el[name] = ld$.find(document, "*[data-var=" + name + "]", 0);
  });
  el.salary.addEventListener('keyup', function(){
    return calc();
  });
  el["family-count"].addEventListener('change', function(){
    return calc();
  });
  el["is-boss"].addEventListener('click', function(){
    return calc();
  });
  el["is-boss"].addEventListener('input', function(){
    return calc();
  });
  el["disaster-rate"].addEventListener('input', function(){
    return calc();
  });
  calc = function(){
    var salary, isBoss, blis, v, minus, data, i$, i, obj, familyCount, v1, v2;
    salary = +el.salary.value;
    isBoss = el["is-boss"].checked;
    blis = [rates["普通保費"], rates["就業保費"], +el["disaster-rate"].value * 0.01].map(function(it){
      return salary * it;
    });
    v = blis[0] + (isBoss
      ? 0
      : blis[1]);
    el["bli-idv"].value = minus = Math.round(v * rates["bli-idv"]);
    el["bli-com"].value = Math.round(v * rates["bli-com"]) + Math.round(blis[2]);
    el["bli-salary"].value = isBoss
      ? 0
      : Math.round(salary * rates["工資墊償"]);
    el["bli-ret"].value = Math.round(salary * 0.06);
    el.bli.value = (+el["bli-idv"].value) + (+el["bli-com"].value) + (+el["bli-salary"].value);
    data = isBoss
      ? nhi.boss
      : nhi.worker;
    if (data) {
      for (i$ = data.length - 1; i$ >= 0; --i$) {
        i = i$;
        obj = data[i];
        if (!(obj.salary != null) || obj.salary > salary) {
          continue;
        }
        familyCount = +el["family-count"].value;
        v1 = obj["p" + familyCount];
        v2 = obj["com"] || 0;
        el["nhi-idv"].value = v1;
        el["nhi-com"].value = v2;
        el["nhi"].value = v1 + v2;
        minus += v1;
        break;
      }
    }
    return el["pay"].value = salary - minus;
  };
  return calc();
})();