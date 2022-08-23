/* 공지사항 탭 */
$(document).ready(function() {
    $(".cate_list_wrap li").click(function(){
        var idx = $(this).index();
        //alert(idx);
        $(".cate_list_wrap li").removeClass("on");
        $(".cate_list_wrap li").eq(idx).addClass("on");
        $(".notice_wrap").hide();
        $(".notice_wrap").eq(idx).show();
    })
  });


  document.addEventListener("DOMContentLoaded", function() {
    
    marqueeInit({
        uniqueid : "mycrawler"
        , style : {
             "padding" : "2px"
            , "width" : "100%"
            , "height" : "30px"
        }

        , inc : 5                              // 속도

        , mouse : "cursor driven"       // 마우스 사용여부

        , moveatleast : 2                  // 이동속도

        , neutral : 150

        , savedirection : true             // false를 선언하면 마우스 커서가 위치하는 순간 역방향으로 움직인다.

        , random : false                   // 나오는 순서(기본값 : true)

    });

});