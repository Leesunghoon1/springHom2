package com.myweb.www.repository;

import java.util.List;

import com.myweb.www.domain.BoardVO;
import com.myweb.www.domain.PagingVO;

public interface BoardDAO {

	int register(BoardVO bvo);

	List<BoardVO> getList(PagingVO pagingVO);

	BoardVO detail(int bno);

	int postModify(BoardVO bvo);

	int remove(int bno);

	void readcount(int bno);

	int getTotalCount(PagingVO pagingVO);

}
