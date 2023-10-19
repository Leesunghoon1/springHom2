<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
       <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<jsp:include page="../common/header.jsp"/>
<jsp:include page="../common/nav.jsp"/>
<body>
<form action="/board/modify" method="post">

	<table border="1">
	<tr>
		<th>BNO</th>
		<td><input type="text" name="bno" value="${bvo.bno }" readonly="readonly"></td>
	</tr>
	<tr>
		<th>TITLE</th>
		<td><input type="text" name="title" value="${bvo.title}"></td>	
	</tr>
	<tr>
		<th>WRITER</th>
		<td>${bvo.writer }</td>	
	</tr>
	<tr>
		<th>CONTENT</th>
		<td><textarea rows="3" cols="30" name="content">${bvo.content }</textarea></td>	
	</tr>
	</table>
	<button type="submit" class="btn btn-dark">수정</button>
</form>


<jsp:include page="../common/footer.jsp"/>
</body>
</html>
</body>
</html>