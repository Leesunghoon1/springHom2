package com.myweb.www.config;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.view;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewResolverRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.view.InternalResourceViewResolver;
import org.springframework.web.servlet.view.JstlView;

@EnableWebMvc
//이 어노테이션은 Spring MVC (Model-View-Controller)를 활성화하는 데 사용됩니다. 
//Spring MVC는 웹 애플리케이션의 웹 계층을 구성하고 웹 요청과 응답을 처리하기 위한 기능을 제공합니다. 
//@EnableWebMvc를 사용하면 Spring MVC를 설정하고 활성화할 수 있습니다.

@ComponentScan(basePackages = {"com.myweb.www.controller","com.myweb.www.handler"})
//어노테이션은 Spring Framework에서 사용되며, 지정된 패키지들에서 Spring 관리 빈을 자동으로 스캔하도록 지시합니다.
public class ServletConfiguration implements WebMvcConfigurer {
	//ServletConfiguration 클래스를 선언하며, 
	//WebMvcConfigurer 인터페이스를 구현하고 있는 클래스입니다. 이 클래스는 Spring 웹 애플리케이션의 서블릿 구성을 담당합니다.

	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {
		registry.addResourceHandler("/resources/**").addResourceLocations("/resources/");
		//컴포넌트를 찾아서 빈으로 등록합니다. 이렇게 스캔된 컴포넌트는 Spring IoC 컨테이너에서 관리되며, 
		//예를 들어 컨트롤러와 핸들러 등의 웹 구성 요소가 포함될 것입니다.
		//나중에 파일 업로드 경로 추가
	}

	@Override
	public void configureViewResolvers(ViewResolverRegistry registry) {
		//이 메소드는 Spring MVC의 ViewResolverRegistry를 구성할 때 사용됩니다. 
		//이 메소드는 뷰 리졸버(View Resolver) 설정을 변경하고 정의할 수 있습니다.
		InternalResourceViewResolver viewResolver = 
				new InternalResourceViewResolver();
		//이 코드는 InternalResourceViewResolver 클래스를 생성하여 뷰 리졸버 객체를 만듭니다. 
		//InternalResourceViewResolver는 JSP와 같은 내부 리소스(뷰)를 처리하는 Spring의 뷰 리졸버 중 하나입니다.
		viewResolver.setViewClass(JstlView.class);
		//이 라인은 viewResolver 객체가 사용할 뷰 클래스를 설정합니다. 여기서 JstlView 클래스를 사용하도록 설정되었습니다.
		viewResolver.setPrefix("/WEB-INF/views/");
		//이 코드는 뷰 리졸버에게 JSP 뷰 파일의 위치(접두사)를 설정합니다. JSP 파일은 "/WEB-INF/views/" 디렉토리 아래에 있을 것으로 가정합니다.
		viewResolver.setSuffix(".jsp");
		//이 코드는 뷰 리졸버에게 JSP 파일 확장자를 설정합니다. 여기서 ".jsp" 확장자를 사용하도록 설정되었습니다.
		registry.viewResolver(viewResolver);
		
		//. JSP 파일이 "/WEB-INF/views/" 디렉토리에서 .jsp 확장자를 가진 파일로 처리되며, JstlView를 사용하여 렌더링됩니다.


	}
	
	//bean으로 multipartResolver 설정

}
