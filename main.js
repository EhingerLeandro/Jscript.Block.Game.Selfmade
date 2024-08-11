const blocksField = document.querySelector("#blocksField");
const numBlocks = 200;
const blockArray = Array(200).fill({filled:false, row:null, column:null});


function renderBlocks(){
	blockArray.forEach((item, index)=>{

		item.column= index%10;
		item.row = Math.floor(index/10);
		
		let divBlock = document.createElement("div");
		divBlock.style.border="0.25px solid #6666";
		divBlock.id=`${"block-"+index}`;
		blocksField.append(divBlock) 

		console.log(item.row+" "+item.column +" "+ divBlock.id);
	})
}
 renderBlocks();