---
sidebar: auto
---
# 常见异常解决方案总结

## Java/Spring

1. `Caused by: com.alibaba.fastjson.JSONException: default constructor not found.`

    - 解决方案：解析的目标类增加无参构造方法。

1. 使用 `frontend-maven-plugin` 进行maven打包时出现以下错误：

    `Failed to execute goal com.github.eirslett:frontend-maven-plugin:1.6:install-node-and-npm (install node and npm) on project spider-web: Could not extract the npm archive: Could not extract archive: 'C:\Users\xxx\.m2\repository\com\github\eirslett\npm\5.7.1\npm-5.7.1.tar.gz': EOFException`

    - 解决方案：把./m2目录下载不完全的包清掉之后再执行打包。

1. Apache工具类方法FileUtils.forceDelete(File file)报 `java.io.IOException: Unable to delete file:` 错误。

    - 解决方案：检查file的路径是否是绝对路径，相对路径有可能会出问题。

1. `sudo: no tty present and no askpass program specified`

    - 解决方案：设置指定用户（如 gitlab-runner）使用sudo命令不需要手动输入登录密码。
        ```bash
        vi /etc/sudoers
        gitlab-runner ALL=(ALL) NOPASSWD: ALL
        ```

1. Spring Cloud架构下微服务使用 `@EnableJpaAuditing` 开启审计功能时，需要调用方服务依赖 `spring-aspects.jar` 包，否则在使用RestTemplate进行服务间调用时会报如下错误：
    `o.s.s.o.provider.endpoint.TokenEndpoint  : Handling error: InternalAuthenticationServiceException, sun.reflect.annotation.TypeNotPresentExceptionProxy`

    - 解决方案：通过在TypeNotPresentExceptionProxy类的构造方法中打断点，发现根本原因是：
        `java.lang.NoClassDefFoundError: org/springframework/beans/factory/aspectj/ConfigurableObject`

        而该类是存在于spring-aspects包中，最终通过添加该依赖解决问题。

1. JPA事务管理踩坑：
    ```
    If you retrieve an entity, for example using the findOne method call within a transactional method it has become managed from that point by the persistence provider.
    Now if you make any changes to that entity (which is actually a proxy object), upon transaction commit, those changes will be persisted to the database, regardless of the fact of invoking the save or update methods.
    save or persist has to be used when you are creating a new entity from scratch and persistence provider does not know of its existance yet.
    Remember that you can prevent making any changes upon commit, if you use detach or evict methods on that particular entity before those changes occur.
    ```

    - 翻译：如果您检索实体，例如findOne在事务方法中使用方法调用，则由持久性提供程序从那时起管理它。现在，如果对该实体（实际上是代理对象）进行任何更改，则在事务提交时，无论调用save或update方法的事实如何，这些更改都将持久保存到数据库。save或者persist必须在从头开始创建新实体时使用，并且持久性提供程序还不知道它的存在。请记住，如果在发生更改之前在特定实体上使用detach或使用evict方法，则可以阻止在提交时进行任何更改。

    - 解决方案：简而言之，就是在save通过findxxxByxxx查询得到的对象的时候，如果有spring的事务进行控制时，需要new一个同类型的对象再去save。

    - 参考：[SpringBoot JPA need no .save() on @Transactional?](https://stackoverflow.com/questions/46708063/springboot-jpa-need-no-save-on-transactional)

1. Logback使用AmqpAppender的json格式日志向elk打印日志时，如果使用%ex会因为异常堆栈信息中包含为转义的\t\n等字符导致logstash的json解析失败，从而使得日志中无法记录堆栈信息。

    - 解决思路：
        1. logstash的input直接使用 `codec => plain` 解析，此方式适用于 `AmqpAppender` 的 `pattern` 格式为字符串日志而不是类json格式日志
        2. pattern中使用 `%replace` 对 `%ex` 中的 `\t\n` 等字符进行转义替换

1. 使用Spring RestTemplate 获取 JPA 的 Page 对象时，会报错：
    ```
    org.springframework.web.servlet.mvc.support.DefaultHandlerExceptionResolver - Failed to read HTTP message: org.springframework.http.converter.HttpMessageNotReadableException: JSON parse error: Can not construct instance of org.springframework.data.domain.Page: abstract types either need to be mapped to concrete types, have custom deserializer, or contain additional type information; nested exception is com.fasterxml.jackson.databind.JsonMappingException: Can not construct instance of org.springframework.data.domain.Page: abstract types either need to be mapped to concrete types, have custom deserializer, or contain additional type information
    at [Source: java.io.PushbackInputStream@77866dd9; line: 1, column: 1]
    ```

    - 解决方案：需要使用Page的实现类来接收Page对象，否则jackson在进行反序列化时会解析失败。

        编写自定义Page实现类：

        ```Java
        public class Pagination<T> extends PageImpl<T> {
            private static final long serialVersionUID = 982848586283423960L;

            public Pagination(List<T> content, Pageable pageable, long total) {
                super(content, pageable, total);
            }

            public Pagination(List<T> content) {
                super(content);
            }

            public Pagination() {
                super(Lists.newArrayList());
            }
        }
        ```

        使用自定义Page实现类接收RestTemplate返回的Page对象：

        ```Java
        Pagination<VO> VOPage = restTemplate.getForObject(url, Pagination.class);
        ```

    - 参考：[Spring RestTemplate with paginated API](https://stackoverflow.com/questions/34647303/spring-resttemplate-with-paginated-api)

1. `Caused by: io.lettuce.core.RedisCommandExecutionException: ERR value is not an integer or out of range`

    - 原因分析：出现该错误的原因是使用自定义的RestTemplate构造RedisAtomicLong是，RestTemplate的序列化方式可能不是RedisAtomicLong支持的。

    - 解决方案：可以在构造RedisAtomicLong时使用 `new RedisAtomicLong(FLAG_KEY, redisConnectionFactory)` 代替 `new RedisAtomicLong(FLAG_KEY, redisTemplate)`。使用RedisAtomicLong类型默认支持的序列化方式进行构造不会出现此错误。

    - 参考：[https://blog.csdn.net/wangjun5159/article/details/52387782](https://blog.csdn.net/wangjun5159/article/details/52387782)

1. 当使用Spring JdbcTemplate结合BeanPropertyRowMapper编写orm层时，enum字段转换会出现问题，BeanPropertyRowMapper默认enum类型反序列化时依据枚举值的ordinal（序号），即使enum类中使用@JsonCreator指定使用枚举值的某个字段进行反序列化也无效，因为BeanPropertyRowMapper中并未使用@JsonCreator注解。

    - 解决方案：自定义BeanPropertyRowMapper，重写getColumnValue方法，根据PropertyDescriptor判断是否是enum类型，并做对应的转换操作。

    - 参考：[Spring JDBC BeanPropertyRowMapper yes no ('Y','N') to boolean bean properties](https://stackoverflow.com/questions/15411843/spring-jdbc-beanpropertyrowmapper-yes-no-y-n-to-boolean-bean-properties)

1. 使用Zuul转发OAuth2认证服务的路由，通过表单登录会报错：

    `full authentication is required to access this resource`

    - 原因分析：在客户端中处于未认证的状态访问需要认证的资源时会跳转至OAuth2认证服务的登录页面进行认证，而认证的过程中会发现判断request中没有 `Authorization` 请求头，而登录认证是需要 `client_id` 和 `client_secret` 信息存储在 `Authorization` 请求头里的，这就导致报错了。而根本的原因是从网关转发到认证服务的登录页面时直接重定向到了 `auth-server/login` 而不是 `gateway/proxy/login` 登录页面，重定向时丢失了 `Authorization` 信息。

    - 解决方案：OAuth2认证服务在做单点登录SSO时，不通过网关进行路由转发。

## Vue.js

1. Vue.js2.x 报 `Cannot read property '__ob__' of undefined` 的错误。

    - 解决方案：检查vue组件的 `data()` 方法是否有 `return` 语句。