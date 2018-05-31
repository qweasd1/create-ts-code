import {file} from "../src/createTsCode";
import {TsClass} from "../src/interface/TsClass";


it('create simple code', function () {
  const code = file(({
                       $from,
                       $let,
                       $const,
                       $public, $protected, $private, $static, $abstract, $field, $export, $line, $class, $interface, $enum,
                       $ref, $invoke, $invoke_, $method, $get, $set, $function, $arrow, $constructor, $annotation,$function_, $arrow_,
                       $array_, $obj_
                     }) => {
    $from("path").importModule()
    $line(2)
    $let("a").equals("1")
    $line()
    $line("// some comment")
    $const("b").equals("2")
    $public.interface("Some").body("a = 1")
    $public.interface("Some2").body("b = 2")
    $public.abstract.class("Some3").body(() => {
      $public.field("a").type("number").equals("23")
      $protected.field("b = 1")
      $private.field("c = 1")
      $field("d = 3")
      $static.field("e = 1")

      $abstract.field("f:number")
      $abstract.method("abstrctMethod").args("a:number").returns("number")

      $method("SomeFn").body(() => {
        $line("return 1")
      })

      $get("attr").body("return 'test'")
      $constructor().args("private http:HttpClient", "private other:OtherService").if(false).args("private some:SomeService").endif().argsMultiline()
    })

    $annotation("Component",{
      selector:"'some-selector'",
      templateUrl:"'some.html'"
    })
    $export.abstract.class("Some4")
    $export.let("t = 1")
    $export.const("t = 2")
    $export.field("some")
    $export.default.class("Some5")

    $class("Some6").body(() => {
      $field("a = 1")
      $field("b = 2")
    })

    $interface("Some7").body(() => {
      $field("a = 1")
      $field("b = 2")
      $method("aaa")
    })

    $enum("Some8").body(() => {
      $field("a = 1")
      $field("b = 2")
    })

    $ref("a.b.c[0]")
    $invoke("some")
    $let("t").equals($invoke_("some", "1", "2", "3").invoke("other").multiline())
    $method("method").args("a", "b:number", "c").returns("string").body(() => {
      $let("t = 1")
      $line("return 'aaa'")
    })
    $set("some").args("value").body("this.value = value")

    $annotation("Get", `"/api/some"`)
    $function("some").args("a:number").returns("number").body("return a")

    $arrow().args("a", "b").body("return a > b")
    $let("t").equals($invoke("test"))
    $let("t").equals($arrow().body("return 1"))
    $let("t").equals($obj_({a: $arrow_(), b:"1"}).multiline())
    $let("t").equals($array_("1","2").multiline())
    $let("t").equals($function_().body("return 1"))
  })
  console.log(code);

});


it('angular component', function () {
  function lifecyleImplements(lifecycles){
      return ($class:TsClass)=>{
        for(let key in lifecycles){
          if(lifecycles[key]){
            $class.implements(key)
          }
        }
      }
  }
  console.log(file(({$class, $annotation, $method, $from, $line, $constructor, $field, $array_, $let})=>{
    const isInit = true
    $from("angular/core").imports("Component").if(isInit).imports("OnInit")

    $line(2)

    $annotation("Component",{
      selector:"'some-selector'",
      html:"'template.html'"
    })
    $class("SomeComponent").loads(lifecyleImplements({OnInit:true,OnDestroy:true})).body(()=>{
      $line()
      $field("subs:ISubscription[] = []")
      $field("subs:ISubscription[] = []")
      
      $line()
      $constructor().args("private http:httpClient").argsMultiline().body(()=>{

      })

      $line()
      $method("ngOnInit")

      $line()
      $let("some").equals($array_("1","2").loads((array)=>{
        array.push("3","4")
      }))


    })

  }));
});


