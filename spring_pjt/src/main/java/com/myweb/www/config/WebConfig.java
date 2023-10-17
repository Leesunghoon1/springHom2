package com.myweb.www.config;

import javax.servlet.Filter;
import javax.servlet.ServletRegistration;
import javax.servlet.ServletRegistration.Dynamic;

import org.springframework.web.filter.CharacterEncodingFilter;
import org.springframework.web.servlet.support.AbstractAnnotationConfigDispatcherServletInitializer;

public class WebConfig extends AbstractAnnotationConfigDispatcherServletInitializer{

	@Override
	protected Class<?>[] getRootConfigClasses() {
		// TODO Auto-generated method stub
		return new Class[] {RootConfig.class};
		// 메소드는 Root 설정 클래스(예: RootConfig)를 반환합니다.
		// Root 설정 클래스는 Spring 애플리케이션의 루트 구성을 정의하며, 보통 데이터베이스 연결
	}

	@Override
	protected Class<?>[] getServletConfigClasses() {
		// TODO Auto-generated method stub
		return new Class[] {ServletConfiguration.class};
		//이 메소드는 서블릿 설정 클래스(예: ServletConfiguration)를 반환합니다. 
		//서블릿 설정 클래스는 Spring 웹 애플리케이션의 서블릿 관련 구성을 정의하며, 주로 Spring MVC와 관련된 설정을 포함합니다.
	}

	@Override
	protected String[] getServletMappings() {
		// TODO Auto-generated method stub
		return new String[] {"/"};
		//이 메소드는 Spring MVC 디스패처 서블릿의 URL 매핑을 정의합니다
	}

	@Override
	protected Filter[] getServletFilters() {
		// encoding filter 설정
		CharacterEncodingFilter encodingFilter = new CharacterEncodingFilter();
		encodingFilter.setEncoding("UTF-8"); // 문자 인코딩 필터
		encodingFilter.setForceEncoding(true); //외부로 나가는 데이터도 인코딩 설정
		return new Filter[] {encodingFilter};
	}

	@Override
	protected void customizeRegistration(ServletRegistration.Dynamic registration) {
		// 그외 기타 사용자 설정
		// 사용자 지정 익셉션 설정을 할것인지 처리
		registration.setInitParameter("throwExceptionIfNotHandlerFound", "true");
		//메소드는 서블릿 등록을 사용자 정의하는 데 사용됩니다. 여기에서는 "throwExceptionIfNotHandlerFound" 초기화 매개변수를 설정하고 있습니다. 
		//이 초기화 매개변수는 요청에 대한 처리기(핸들러)를 찾을 수 없을 때 예외를 던질지 여부를 제어합니다. "true"로 설정하면 처리기가 없는 경우 예외가 발생하며,
		//"false"로 설정하면 예외가 발생하지 않습니다.
		
	}
	

}
