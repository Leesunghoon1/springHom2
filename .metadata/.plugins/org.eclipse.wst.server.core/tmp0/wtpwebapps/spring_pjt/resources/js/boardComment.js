/**
 * 
 */

console.log(bnoVal);


async function postCommentToserver(cmtData) {
    //이 펑션 쓸때 밑에 메소드 cmtData(받는값)
    try{
        //try 블록: 예외가 발생할 가능성이 있는 코드를 감싸는 블록입니다. 
        //예외가 발생하면 catch 블록으로 제어가 이동합니다.
        const url="/comment/post";
        //url 상수: 서버로 요청을 보낼 엔드포인트(경로)를 저장하는 상수입니다.
        const config={
            //상수: fetch 요청의 설정을 정의하는 객체입니다.
            // 이 객체에는 요청 방법, 헤더 설정 및 데이터(body)가 포함됩니다.
            method:"post",
            headers: {
                'content-type' : 'application/json; charset=utf-8'
            },
            body:JSON.stringify(cmtData)
        };
        const resp=await fetch(url,config);
        //네트워크 요청을 수행하는 함수로, 서버에 요청을 보내는 역할을 합니다. 
        //await를 사용하여 이 요청이 완료될 때까지 대기합니다.
        const result=await resp.text(); //isOK
        //서버 응답의 내용을 텍스트로 파싱합니다. 이 작업도 await를 사용하여 비동기로 처리되며, 
        //결과를 result 상수에 저장합니다.
        // 주로 서버 응답의 성공 여부를 나타내는 텍스트 데이터를 받습니다.
        return result;
    }catch(error) {
        console.log(error)
    }
}


document.getElementById('cmtPostBtn').addEventListener('click',()=>{
//HTML 문서에서 cmtPostBtn 찾아서 클릭하면 이벤트 발생

console.log("123");

const cmtText=document.getElementById('cmtText').value;
//인풋이면 벨류로 값 떠오기

const cmtWriter=document.getElementById('cmtWriter').innerText;

if(cmtText==""||cmtText==null) {
    alert("댓글입력해줘");
    document.getElementById('cmtText').focus();
    //댓글 입력 필드에 포커스를 줍니다.
    return false;
}else{
    let cmtData={
        bno:bnoVal,
        writer:cmtWriter,
        content:cmtText
    }
    console.log(cmtData);

    postCommentToserver(cmtData).then(result=>{

        console.log(result);

        if(result==1) {
            alert("댓글입력완료");
            document.getElementById('cmtText').value='';
            getCommentList(bnoVal); 
            //댓글 뿌리는애
                //getCommentList 함수를 호출하여 댓글 목록을 가져오는 것으로 보입니다. 
                //bnoVal은 게시물 번호를 나타내며, 
                //이를 이용하여 해당 게시물에 대한 댓글 목록을 가져올 수 있습니다.
            }
        })
    }
})

async function spreadCommentListFromServer(bno, page) {
    try{
        const resp = await fetch('/comment/'+bno+'/'+page);

        //await fetch('/comment/'+bno);: 이 줄은 fetch() 함수를 사용하여 서버로부터 데이터를 가져옵니다.
        //fetch()는 웹 API로, 지정된 URL에서 리소스를 가져오는 데 사용됩니다.
        //'/comment/'+bno는 서버에서 데이터를 가져올 경로입니다. bno는 함수의 매개변수로 전달된 값이 사용됩니다.
        //await는 비동기 함수 내에서 사용되며, fetch() 함수가 완료될 때까지 기다립니다.

        const result = await resp.json();
 
       //await resp.json();: 이 줄은 서버에서 받은 응답을 JSON 형식으로 변환합니다.
        //resp.json()은 응답(resp)에서 JSON 데이터를 추출하는 메서드입니다.
        //await는 비동기 처리를 수행하고, JSON 변환이 완료될 때까지 기다립니다.
        
        return result;
        
    }catch(err) {
        console.log(err);
    }
}


function getCommentList(bno, page=1){
    spreadCommentListFromServer(bno, page).then(result =>{
      
        //이 줄은 getCommentList라는 JavaScript 함수를 정의합니다. 함수는 bno라는 매개변수를 받아옵니다.
        //.then() 메서드를 사용합니다. .then() 메서드는 비동기 작업이 완료되면 실행되는 콜백 함수를 정의합니다.
        
        
        //이 줄은 HTML 문서에서 id가 "cmtArea"인 요소를 찾아서 tbody 변수에 할당합니다. 
        //이 요소는 결과를 출력할 테이블의 tbody를 나타냅니다.
        let tbody = document.getElementById('cmtArea');
        console.log(result);
      
        if(result.cmtList.length > 0) {

            
            if(page == 1) {
                //1페이지 일때만
                tbody.innerHTML="";
            }
    
            // 이 줄은 tbody 요소의 내용을 초기화합니다.
            for(let i = 0; i < result.cmtList.length; i++) {
                //이 부분은 result 배열을 순환하면서 각 댓글에 대한 HTML 테이블 행을 생성합니다.

                
                let str = `<tr data-cno="${result.cmtList[i].cno}" data-content="${result.cmtList[i].content}" >`;
                str += `<td >${result.cmtList[i].cno}</td>`
                str += `<td>${result.cmtList[i].writer}</td>`
                str += `<td>${result.cmtList[i].content}</td>`
                str += `<td>${result.cmtList[i].modAt}</td>`
                str += `<td><button type="button" class="modBtn" data-bs-toggle="modal" data-bs-target="#myModal">%</button></td>`
                str += `<td><button type="button" class="delBtn">x</button></td>`
                str += `</tr>`

                tbody.innerHTML+= str;
                //이 부분은 str을 tbody 요소의 HTML 내용에 추가합니다. 이로써 테이블 행이 동적으로 생성되고 표시됩니다.
            }
            //댓글페이징 라인
            let moreBtn = document.getElementById('moreBtn');
            console.log(moreBtn);
            //db에서 pgvo + list 같이 가져와야 값을 줄 수 있음.
            
            if(result.pgvo.pageNo < result.endPage || result.next) {
                //다음페이지가 있는지 없는지 확인
                moreBtn.style.visibility = 'visible';
                moreBtn.dataset.page = page + 1;
            }else{
                moreBtn.style.visibility = 'hidden';
            }


        }
        
        else{
            let td = `<td>CommentListEmpty</td>`
            //변수에 댓글 목록이 비어 있는 경우에 표시할 "CommentListEmpty" 메시지를 생성합니다.
            tbody.innerHTML = td;
            // 부분은 td 변수의 내용을 tbody 요소의 HTML 내용으로 설정합니다.
            // 이로써 댓글 목록이 비어 있을 때 "CommentListEmpty" 메시지가 출력됩니다.
        }
    })
}

async function removeCommentToServer(cno) {
    
    try{
        const url='/comment/' + cno;
        //이 줄은 url 변수에 댓글 삭제를 요청할 URL을 지정합니다.
        // cno는 함수의 매개변수로 전달된 댓글 번호를 사용합니다.
        const config = {
            method : 'delete'
            //이 줄은 HTTP 요청 구성을 나타내는 config 객체를 생성합니다. 
            //이 객체는 delete 메서드를 사용하여 서버로 DELETE 요청을 보낼 것임을 지정합니다.
        };
        const resp = await fetch(url, config);
        const result = await resp.text();
        return result;
    }catch(err) {
        console.log(err);
    }
}

document.addEventListener('click', (e)=>{
    if(e.target.classList.contains('delBtn')) {
        // 부분은 클릭된 엘리먼트가 'delBtn' 클래스를 가지고 있는 경우를 확인합니다.
        // 이 조건은 삭제 버튼이 클릭된 경우를 감지합니다.
        
        let tr = e.target.closest('tr')
        //이 줄은 클릭된 버튼의 부모 테이블 행(tr) 엘리먼트를 찾아서 tr 변수에 할당합니다.
        let conVal = tr.dataset.cno;
        //이 줄은 tr 엘리먼트의 data-cno 속성에서 댓글 번호(cno) 값을 가져옵니다.

        removeCommentToServer(conVal).then(result =>{
            //함수를 호출하여 댓글을 서버에서 삭제합니다. 
            //그리고 삭제 결과(result)를 처리하기 위해 .then() 메서드를 사용합니다.
            if(result == 1) {
                alert("댓글 삭제");
            }
            getCommentList(bnoVal);
            //화면 뿌리기
        })
    }else if(e.target.classList.contains('modBtn')) {

        let tr = e.target.closest('tr');

        let cmtText = tr.dataset.content;


        document.getElementById('cmtTextMod').value = cmtText;
        

        document.getElementById('cmtModBtn').setAttribute('data-cno', tr.dataset.cno);

    }else if(e.target.id == 'cmtModBtn') {
        
        
        let cmtDataMod={
            cno : e.target.dataset.cno,
            content : document.getElementById('cmtTextMod').value
        };
        console.log(cmtDataMod);
        editCommentToServer(cmtDataMod).then(result=>{
                if(parseInt(result)) {
                    //모달창 닫기
                    getCommentList(bnoVal);
                    document.querySelector('.btn-close').click();
                }
        })
    }else if(e.target.id == 'moreBtn') {
        getCommentList(bnoVal, parseInt(e.target.dataset.page));
    }
})

async function editCommentToServer(cmtDataMod) {
    try {
        const url = '/comment/'+cmtDataMod.cno;
        const config = {
            method: 'put',
            headers: {
                'Content-Type' : 'application/json; charset=utf-8'
            },
            body: JSON.stringify(cmtDataMod)
        };

        const resp = await fetch(url, config);
        const result = await resp.text();
        return result;

    } catch (error) {
        console.log(error);
    }
}