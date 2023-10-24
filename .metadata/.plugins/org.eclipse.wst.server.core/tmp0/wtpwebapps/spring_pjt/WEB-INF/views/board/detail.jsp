<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
           <%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert detail here</title>

</head>
<jsp:include page="../common/header.jsp"/>
<jsp:include page="../common/nav.jsp"/>
<body>


<h1>디테일</h1>

<table border = 1>
	<tr>
		<th>BNO</th>
		<td>${bvo.bno }</td>
	</tr>
	<tr>
		<th>TITLE</th>
		<td>${bvo.title }</td>
	</tr>
	<tr>
		<th>WRITER</th>
		<td>${bvo.writer }</td>
	</tr>
	<tr>
		<th>REG_DATE</th>
		<td>${bvo.regAt }</td>
	</tr>
	<tr>
		<th>read_count</th>
		<td>${bvo.readCount }</td>
	</tr>
</table>


<a href="/board/modify?bno=${bvo.bno }"><button>수정</button></a>
<a href="/board/remove?bno=${bvo.bno }"><button>삭제</button></a>
<a href="/board/list?bno=${bvo.bno }"><button>리스트</button></a>



<!-- 댓글라인  -->
<div>
   <!-- 댓글 등록 라인 -->
   <div class="input-group mb-3">
     <span class="input-group-text" id="cmtWriter">Writer</span>
     <input type="text" class="form-control" placeholder="Comment Content" id="cmtText">
     <button class="btn btn-primary" type="button" id="cmtPostBtn">POST</button>
   </div>
   <!-- 댓글 표시 라인 -->
<table class="table">
    <tr>
      <th scope="col">#</th>
      <th scope="col">Writer</th>
      <th scope="col">Content</th>
      <th scope="col">Mod-Date</th>
    </tr>
   <tbody id="cmtArea">
       <tr>
         <th scope="row">1</th>
         <td>writer</td> <!-- writer -->
         <td>content</td> <!-- content -->
         <td>reg_date</td> <!-- modAt -->
       </tr>
    </tbody>
</table>

<!-- 댓글 페이징 라인  -->

<div>
	<div>
		<button type="button" id="moreBtn" data-page="1"
		class="btn btn-outline-dark" style="visibility:hidden">MORE+</button>
	</div>
</div>


<!-- 모달창  -->


<div class="modal" id="myModal" tabindex="-1">
      <div class="modal-dialog">
         <div class="modal-content">
            <div class="modal-header">
               <h5 class="modal-title">Writer</h5>
               <button type="button" class="btn-close" data-bs-dismiss="modal"
                  aria-label="Close"></button>
            </div>
            <div class="modal-body">
               <div class="input-group mb-3">
                  <input type="text" class="form-control" placeholder="Comment Content" id="cmtTextMod">
                  <button class="btn btn-primary" type="button" id="cmtModBtn">POST</button>
               </div>
            </div>
            <div class="modal-footer">
               <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
         </div>
      </div>
   </div>


<script >

let bnoVal=`<c:out value='${bvo.bno}'/>`;


console.log(bnoVal);

//의 값을 콘솔에 출력합니다. 이를 통해 JavaScript가 올바르게 변수를 가져오고 할당된 값을 확인할 수 있습니다.
//<씨아웃value='${bvo.bno}'/>;: 이 줄은 JavaScript 변수 bnoVal을 선언하고 초기화합니다. 
//이 코드의 주요 특징은 JSP 표현식 씨아웃 을 사용하여 JSP 변수 bvo.bno의 값을 JavaScript 변수에 할당하는 것입니다.
//씨아웃은 JSP의 표현식을 출력하는 데 사용되는 태그입니다. 
//${bvo.bno}은 JSP 변수 bvo.bno의 값을 출력하는 표현식입니다. 이 값은 JavaScript 변수 bnoVal에 할당됩니다.

</script>



	<script type="text/javascript" src="/resources/js/boardComment.js">
	//이 부분은 외부 JavaScript 파일을 HTML 문서로 가져오는 역할을 합니다.
	//src 속성에는 JavaScript 파일의 경로가 지정되어 있습니다. 여기서 
	//resources/js/boardComment.js 파일이 가져와집니다.
	</script>
	
	
	<script type="text/javascript">
	//이 부분은 인라인 JavaScript 코드 블록을 시작합니다.
	getCommentList(bnoVal);
	//이 부분은 JavaScript 함수 getCommentList를 호출하는 코드입니다. 
	//getCommentList는 아마도 boardComment.js 파일에 정의된 함수일 것입니다. bnoVal은 이 함수의 매개변수로 전달되는 변수로, 
	//이전 코드에서 let bnoVal로 선언되고 초기화된 변수입니다.
	//getCommentList 함수가 호출되면, bnoVal의 값이 함수에 전달됩니다. 
	//이를 통해 함수는 bnoVal 값을 활용하여 어떤 작업을 수행하거나 서버로 요청을 보낼 수 있습니다.


	</script>
	
	<jsp:include page="../common/footer.jsp"/>
</body>
</html>