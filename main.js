const blocksField = document.querySelector("#blocksField");
const left = document.getElementById("left");
const right = document.getElementById("right");
const start = document.getElementById("start");
const clear = document.getElementById("clear");
const freeze = document.getElementById("freeze");
const numBlocks = 200;
const blockArray = Array(numBlocks).fill({filled:false, row:null, column:null});
let blockArrayFilled=[];
let historyArray=[];
let blockNumParse;
let blockVisualized;
let blockVisualizedBefore;
let cleanEveryBlock;
let off = true;
let intervalAdvance;
let newBlock;


class BlockFigurine{
	constructor(shape, posColumn, posRow){
		this.shape = shape,
		this.posColumn = posColumn,
		this.posRow = posRow
	}
	advanceBlock(){
		this.posRow += 1;
		return
	}
	moveBlockLeft(){
		if(this.posColumn<=9){
			console.log(this.posColumn);
			this.posColumn -=1;
			console.log(this.posColumn);
		}
		return
	}
	moveBlockRight(){
		if(this.posColumn>=0){
			console.log(this.posColumn);
			this.posColumn += 1;
			console.log(this.posColumn);
		}
		return
	}
}

function renderGrids(){
	blockArrayFilled = blockArray.map((item, index)=>{
		return {filled:false, row:Math.floor(index/10), column:index%10}
	})

	blockArrayFilled.forEach((item, index)=>{
		item.column= index%10;
		item.row = Math.floor(index/10);
		
		let divBlock = document.createElement("div");
		divBlock.style.border="0.25px solid #6666";
		divBlock.id=`${"block-"+index}`;
		blocksField.append(divBlock);
	})
}
 renderGrids();


 function renderBlockLimits(){
 	for(i=0; i<10; i++){
 		const blockLimits = document.getElementById(`block-${i}`);
 		blockLimits.classList.add("blockLimits");
 	}
 	for(i=190; i<200; i++){
		const blockLimits = document.getElementById(`block-${i}`);
		blockLimits.classList.add("blockLimits");
 	}
 }
 renderBlockLimits()

function advancementBlock(blocky){
	blocky.advanceBlock();
	blockNumParse = parseInt(`${blocky.posRow*10+ blocky.posColumn}`);
	historyArray.push(blockNumParse);

	// console.log("blockParseNum=>"+blockNumParse);
	// console.log("historyArray=>"+historyArray[historyArray.length - 2])
	// console.log("#####################")

	blockVisualized = document.getElementById(`block-${blockNumParse}`);
	blockVisualizedBefore = document.getElementById(`block-${historyArray[historyArray.length - 2]}`);

	if(blocky.posRow>=2){ blockArrayFilled[historyArray[historyArray.length - 2]].filled = false;}
	blockArrayFilled[blockNumParse].filled = true;


	if(blocky.posRow>=2){ blockVisualizedBefore.classList.remove("blockActive");}
	blockVisualized.classList.add("blockActive");
	
 
	if(blocky.posRow >= 18 || blockArrayFilled[blockNumParse + 10].filled===true ){
		clearInterval(intervalAdvance);
		if(!(blockArrayFilled[11].filled||
			blockArrayFilled[12].filled||
			blockArrayFilled[13].filled||
			blockArrayFilled[14].filled||
			blockArrayFilled[15].filled||
			blockArrayFilled[17].filled||
			blockArrayFilled[18].filled||
			blockArrayFilled[19].filled)){
			historyArray=[];
			renderBlock()
		}
	}
}

function renderBlock(){
	newBlock = new BlockFigurine(0, Math.floor(Math.random()*10), 0);
	intervalAdvance = setInterval(()=>advancementBlock(newBlock), 100);
}

right.addEventListener("click",()=>newBlock.moveBlockRight());
left.addEventListener("click",()=>newBlock.moveBlockLeft());

start.addEventListener("click", ()=>{
	if(off){
		renderBlock();
		off = false;
	}
});

freeze.addEventListener("click", ()=>{
	clearInterval(intervalAdvance);
	off = true;
})

clear.addEventListener("click", ()=>{
	clearInterval(intervalAdvance);
	blockArrayFilled.forEach((item, index)=>{
		item.filled=false;
		cleanEveryBlock = document.getElementById(`block-${index}`);
		cleanEveryBlock.classList.remove("blockActive");
	});
	off = true;
})

renderBlock();
