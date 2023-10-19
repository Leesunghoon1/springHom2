package com.myweb.www.handler;

import com.myweb.www.domain.PagingVO;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
public class PagingHandler {
	
	private int startPage;
	//화면에 보이는 페이지네이션 번호
	
	private int endPage;
	//1~10, //11~20, //21~30....
	//화면에 보여지는 마지막 페이지네이션 번호
	
	private int realEndPage;
	
	private boolean prev, next;
	//이전과 다음의 존재 여부
	
	private int totalCount;
	//총 글자수
	
	private PagingVO pgvo;
	
	public PagingHandler(PagingVO pgvo, int totalCount) {
		//pgvo.qty는 : 한페이지에 보이는 게시글의 수 (10개)
		
		//현재 페이지의 값 가져오는 용도 / totalCount DB에 조회 매개변수로 입력받기
		
		this.pgvo = pgvo;
		this.totalCount = totalCount;
		
		this.endPage = 
				(int)Math.ceil(pgvo.getPageNo() / (double)pgvo.getQty())*pgvo.getQty();
		//1~(10), //11~(20), //21~(30)
		//1페이지부터 10페이지까지 어떤 페이지가 선택되도 endPage는 10이 되어야한다
		//1 2 3 4 .... 10 / 10 나누어서 나머지를 올려(ceil) 1로 만들고 * 10 을 하면 1 = 10, 2 = 20, 3 = 30
		// 화면에 표시되어야 하는 페이지 개수 (1 2 3 4 5 6 7 8 9 10) => 10개
		
		this.startPage = endPage - 9;
		
		this.realEndPage = 
				(int)Math.ceil(totalCount/(double)pgvo.getQty()); 
		
		//전체 글수에서 / 한페이지에 표시되는 개시글수pgvo.getQty() 올림
		// 100개라고 치면 (실제페이지개수)/10(qty) 10페이지 까지 나오게
		
		if(realEndPage < endPage) {
			this.endPage = realEndPage;
		}
		
		this.prev = this.startPage > 1;
		
		this.next = this.endPage < realEndPage;
	}
	

}
