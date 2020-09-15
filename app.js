const canvas = document.getElementById("jsCanvas");

// canvas 안에 pixel을 컨트롤
const ctx = canvas.getContext("2d");

const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "#2c2c2c2";
const CANVAS_SIZE = 700;

// default 설정
// pixel modifier 안주면 안그려짐
// css에서 설정한 canvas 크기와 맞춰야함
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

// default 배경 설정
ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

// 색 지정
ctx.fillStyle = INITIAL_COLOR;
ctx.strokeStyle = INITIAL_COLOR;
// 선의 너비
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function stopPainting() {
  painting = false;
}

function startPainting() {
  painting = true;
}

function onMouseMove(event) {
  // window(화면 전체)의 좌표가 아닌 offset의 좌표가 필요함
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {
    // painting = false 일때만 실행 시작점 찾기용도
    // Path는 Line임, subpath를 비우고 새로운 path를 만들때 호출
    ctx.beginPath();
    // begin으로 초기화후 시작점 좌표로 이동
    ctx.moveTo(x, y);
  } else {
    // subpath 마지막지점을 지정된 x, y 좌표에 직선으로 연결
    ctx.lineTo(x, y);
    // 그리기
    ctx.stroke();
  }
}

function handleColorClick(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

function handleRangeChange(event) {
  const size = event.target.value;
  ctx.lineWidth = size;
}

function handleModeClick(event) {
  if (filling === true) {
    filling = false;
    mode.innerText = "Fill";
  } else {
    filling = true;
    mode.innerText = "Paint";
  }
}

function handleCanvasClick() {
  if (filling) {
    // 채우기는 색 설정 선행되야함
    // x, y, width, height
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  }
}

function handleCM(event) {
  // canvas에서 오른쪽 마우스 클릭할때 생기는 매뉴 안나오게 막음
  event.preventDefault();
}

function hanleSaveClick() {
  // URL 뽑아내고
  const image = canvas.toDataURL();
  // a 만들고
  const link = document.createElement("a");
  // a 태그에 속성 추가
  link.href = image;
  link.download = "PaintJS[🎨]";
  link.click();
}

// canvas가 존재하면 수행
if (canvas) {
  // 마우스 움직임 이벤트 확인
  canvas.addEventListener("mousemove", onMouseMove);
  // 마우스를 누르고 있을때 이벤트 확인
  canvas.addEventListener("mousedown", startPainting);
  // 마우스를 눌렀다가 땠을때 이벤트 확인
  canvas.addEventListener("mouseup", stopPainting);
  // 마우스가 컨버스에서 벗어났을 때
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleCanvasClick);
  // canvas에 오른쪽 마우스 클릭할때 생기는 메뉴
  canvas.addEventListener("contextmenu", handleCM);
}

// Object가 아닌 Array를 원하기 때문에 변환 작업 해줌
Array.from(colors).forEach((color) =>
  color.addEventListener("click", handleColorClick)
);

if (range) {
  range.addEventListener("input", handleRangeChange);
}

if (mode) {
  mode.addEventListener("click", handleModeClick);
}

if (saveBtn) {
  saveBtn.addEventListener("click", hanleSaveClick);
}
