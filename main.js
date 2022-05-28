
let result = document.getElementById("result");
let mode = "integer";
let state = "start";

// 数字キーをクリックしたとき
$(".num").click(function () {
  let val = $(this).text();

  // イコールを押した直後ならば一度リセット
  if (state == "finish") {
    result.textContent = "0";
    state = "start";
  }
  // A.表示が0の場合
  // A-1 0を押したときは0のまま
  if (result.textContent == "0" && val == "0") {
    result.textContent = "0";
  // A-2 表示が0で入力した数字が00の場合、0を表示
  }else if(result.textContent =="0" && val == "00"){
    result.textContent = "0";
  // A-3 その他の数字ならば置き換わる
  } else if (result.textContent == "0") {
    result.textContent = val;
  // C. それ以外の場合
  } else {
    result.textContent += val;
  }
});

// 演算子キーをクリックしたとき
$(".operator").click(function () {
  let val = $(this).text();
  if (is_ope_last()) {
    result.textContent = result.textContent.slice(0, -1) + val;
  } else {
    result.textContent += val;
  }

  mode = "integer";
  state = "start";
});

// 小数点キーをクリックしたとき
$(".point").click(function () {
  if (state == "finish") {
    result.textContent = "0";
    state = "start";
  }

  if (mode == "decimal") {
    return;
  } else if (is_ope_last()) {
    result.textContent = result.textContent + "0.";
  } else {
    result.textContent = result.textContent + ".";
  }

  mode = "decimal";
});

// ACキーをクリックしたとき
$(".allClear").click(function () {
  result.textContent = "0";
  mode = "integer";
  state = "start";
});

// ＝キーをクリックしたとき
$(".equal").click(function () {
  // 最後に演算子が入力されている場合、取り除く
  if (is_ope_last()) {
    result.textContent = result.textContent.slice(0, -1);
  }
  result.textContent = new Function("return " + result.textContent)();
  mode = "integer";
  state = "finish";
});



// 直前の入力が演算しか判断
function is_ope_last() {
  return ["+", "-", "*", "/"].includes(result.textContent.slice(-1));
}




