(function(it){
  return it.apply({});
})(function(){
  var ref$, nhi, bli, el, rates, parse, prepare, prizeCalc, calc, this$ = this;
  ref$ = [{}, {}, {}], nhi = ref$[0], bli = ref$[1], el = ref$[2];
  rates = {
    "bli-idv": 0.2,
    "bli-com": 0.7,
    "bli-gov": 0.1,
    "nhi-2nd": 0.0211,
    "普通保費": 0.11,
    "就業保費": 0.01,
    "工資墊償": 0.025 * 0.01
  };
  this.rates = import$({}, rates);
  parse = function(year){
    var p1, p2, p3;
    p1 = new Promise(function(res, rej){
      return Papa.parse("assets/data/nhi-" + year + "-boss.csv", {
        download: true,
        header: true,
        dynamicTyping: true,
        complete: function(ret){
          nhi.boss = ret.data;
          nhi.boss.sort(function(a, b){
            return a.salary - b.salaray;
          });
          return res();
        }
      });
    });
    p2 = new Promise(function(res, rej){
      return Papa.parse("assets/data/nhi-" + year + "-worker.csv", {
        download: true,
        header: true,
        dynamicTyping: true,
        complete: function(ret){
          nhi.worker = ret.data;
          nhi.worker.sort(function(a, b){
            return a.salary - b.salaray;
          });
          return res();
        }
      });
    });
    p3 = new Promise(function(res, rej){
      return Papa.parse("assets/data/bli-" + year + ".csv", {
        download: true,
        header: true,
        dynamicTyping: true,
        complete: function(ret){
          bli.worker = ret.data.filter(function(it){
            return it.salary;
          });
          bli.worker.sort(function(a, b){
            return a.salary - b.salaray;
          });
          return res();
        }
      });
    });
    return Promise.all([p1, p2, p3]);
  };
  prepare = function(year){
    ld$.find(document, "*[data-var=year]", 0).value = year;
    return parse(year).then(function(){
      return ld$.fetch("/assets/data/" + year + ".json", {
        method: "GET"
      }, {
        type: 'json'
      });
    }).then(function(it){
      this$.rates = import$(import$({}, rates), it);
      el["salary"].value = this$.rates["最低薪資"];
      el["salary"].setAttribute('placeholder', year + "年最低薪資為" + this$.rates["最低薪資"] + "元");
      return el["disaster-rate"].value = this$.rates["職災費率"];
    }).then(function(){
      return calc();
    });
  };
  ["year", "salary", "family-count", "is-boss", "bonus-4timed", "pay", "bli-idv", "bli-com", "bli-salary", "bli", "bli-ret", "nhi-idv", "nhi-com", "nhi", "disaster-rate", "bill-total", "prize", "prize-minus", "prize-pretax", "prize-nhi1", "prize-nhi2", "prize-real", "prize-spend"].map(function(name){
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
  el["bonus-4timed"].addEventListener('click', function(){
    return prizeCalc();
  });
  el["bonus-4timed"].addEventListener('input', function(){
    return prizeCalc();
  });
  el["disaster-rate"].addEventListener('input', function(){
    return calc();
  });
  el["year"].addEventListener('change', function(){
    return prepare(el["year"].value);
  });
  el["prize"].addEventListener('keyup', function(){
    return prizeCalc();
  });
  el["prize-minus"].addEventListener('keyup', function(){
    return prizeCalc();
  });
  prizeCalc = function(){
    var prize, prizeMinus, pretax, nhi1, ref$, nhi2;
    prize = +(el["prize"].value || 0);
    prizeMinus = +(el["prize-minus"].value || 0) * 4;
    if (el["bonus-4timed"].checked) {
      prizeMinus = 0;
    }
    el["prize-pretax"].value = pretax = Math.floor(prize * 0.05);
    el["prize-nhi1"].value = nhi1 = Math.round(((ref$ = prize - prizeMinus) > 0 ? ref$ : 0) * rates["nhi-2nd"]);
    el["prize-nhi2"].value = nhi2 = Math.round(prize * rates["nhi-2nd"]);
    el["prize-real"].value = prize - pretax - nhi1;
    return el["prize-spend"].value = prize + nhi2;
  };
  calc = function(){
    var salary, bliSalary, ref$, isBoss, blis, bliIdvBasic, bliIdvDisaster, bliComBasic, bliComDisaster, bliComJob, minus, data, i$, i, obj, familyCount, v1, v2;
    salary = +el.salary.value;
    bliSalary = (bli.worker.filter(function(it){
      return it.salary >= salary;
    })[0] || (ref$ = bli.worker)[ref$.length - 1]).salary;
    isBoss = el["is-boss"].checked;
    blis = [this$.rates["普通保費"], this$.rates["就業保費"], +el["disaster-rate"].value * 0.01].map(function(it){
      return bliSalary * it;
    });
    bliIdvBasic = Math.round(blis[0] * this$.rates["bli-idv"]);
    bliIdvDisaster = Math.round((isBoss
      ? 0
      : blis[1]) * this$.rates["bli-idv"]);
    bliComBasic = Math.round(blis[0] * this$.rates["bli-com"]);
    bliComDisaster = Math.round((isBoss
      ? 0
      : blis[1]) * this$.rates["bli-com"]);
    bliComJob = Math.round(blis[2]);
    el["bli-idv"].value = minus = bliIdvBasic + bliIdvDisaster;
    el["bli-com"].value = bliComBasic + bliComDisaster + bliComJob;
    el["bli-salary"].value = isBoss
      ? 0
      : Math.round(salary * this$.rates["工資墊償"]);
    el["bli-ret"].value = isBoss
      ? 0
      : Math.round(salary * 0.06);
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
    el["pay"].value = salary - minus;
    return el["bill-total"].value = [el["nhi"].value, el["bli"].value, el["bli-ret"].value].reduce(function(a, b){
      return a + +b;
    }, 0);
  };
  return prepare(113);
});
function import$(obj, src){
  var own = {}.hasOwnProperty;
  for (var key in src) if (own.call(src, key)) obj[key] = src[key];
  return obj;
}