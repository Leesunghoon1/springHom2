package com.myweb.www.service;

import java.util.List;

import com.myweb.www.domain.BoardVO;
import com.myweb.www.domain.PagingVO;

public interface BoardService {

	int register(BoardVO bvo);

	List<BoardVO> getList(PagingVO pagingVO);

	BoardVO detail(int bno);

	int postModify(BoardVO bvo);

	int remove(int bno);

	int getTotalCount(PagingVO pagingVO);
}
