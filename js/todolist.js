$(function () {
  //グローバル変数
  const $todoInput = $("#todoInput");

  //テキストボックス内でEnterキーが押下された時の入力値(todo)を取得
  $todoInput.on("keypress", function (event) {
    //Enterキーが押下された時点での入力値の取得
    const input_todo = $(this).val();

    //エンターキー押下&&todo入力済み
    if (event.key === "Enter" && input_todo !== "") {
      console.dir({ event, input_todo });

      //todoList表示領域作成
      createDispDolist(input_todo);

      //input内容をDolistに表示
      displayInputDolist();
    }
  });

  //todoList表示領域の作成
  function createDispDolist(text) {

    //<dolist-item>の作成
    const $newLi = $("<li class='dolist-item'>");
    $newLi.html(`<input type="checkbox" class="list-chk" data-todo="false"/>
      <span class="dolist-txt" data-todo="txt"></span>
      <button class="material-icons" data-todo="false">delete</button>`);

    //"dolist-txt"の要素を取得
    const dolistTxt = $newLi.children(".dolist-txt");

    //入力値のエスケープ処理を行い、"dolist-txt"の内容を更新
    dolistTxt.text(text);

    //<dolist-contents>要素の最後尾に拡張した要素を追加
    $(".dolist-contents").append($newLi);

    //data-todo(txt)にTodoのtext内容をセット
    $newLi.children("span").attr("data-todo", dolistTxt.text());

    //◇"list-chk"にcheckboxがON/OFFされたときのイベントを設定◇
    $newLi.children(".list-chk").on("change", function () {
      //chkboxの切り替え検知
      const checked = $(this).prop("checked");
      console.log(checked);

      //chk=OFF → ONに変更
      if (checked) {
        //dolist/doneList表示領域切り替えの指定
        createSwitchDispList($(this), ".donelist-contents");
        //chk=ON → OFFに変更
      } else {
        //dolist/doneList表示領域切り替えの指定
        createSwitchDispList($(this), ".dolist-contents");
      }

      //表示領域の更新
      displayDoDonelist();
    });

    //buttonがクリックされた時のイベントを設定
    buttonElementAddEvent($newLi);
  }

  //Inputした内容をDolistへ表示
  function displayInputDolist() {
    // "dolistの表示領域を可視化";
    $(".dolist").css("display", "block");

    //入力値の初期化
    $todoInput.val("");
  }

  //dolist/doneList表示領域切り替えの指定
  function createSwitchDispList(target, cName) {
    //checkされた要素(dolist-item or donelist-item)を取得
    const $chkElement = target.parent();
    console.log($chkElement);
    console.log(target);

    //dataset:inputにTodoのcheck状態をセット
    const $input = $chkElement.children(".list-chk");
    $input.attr("data-todo", target.prop("checked"));

    //dolist-item(donelist-item)を複製して、donelist(dolist)に追加
    const $setlist = $chkElement.clone(true);
    $(cName).append($setlist);

    // //"list-chk"にcheckboxがON/OFFされたときのイベントを設定
    $setlist.children().on('change', function(){
      $(this).trigger("change");
    });

    //buttonがクリックされた時のイベントを設定
    buttonElementAddEvent($setlist);

    //checkされたdolist-itemをdo-list(doneList)から削除
    target.parent().remove();
  }

  //Donelistの表示領域を可視化
  function displayDoDonelist() {
    //dolistの表示要素がなくなれば、"dolist"を非表示にする
    if (todoCountNo(".dolist-contents") === 0) {
      $(".dolist").css("display", "none");
    } else {
      // "dolistの表示領域を可視化";
      $(".dolist").css("display", "block");
    }

    //donelistの表示要素がなくなれば、"donelist"を非表示にする
    if (todoCountNo(".donelist-contents") === 0) {
      $(".donelist").css("display", "none");
    } else {
      // "donelistの表示領域を可視化";
      $(".donelist").css("display", "block");
    }
  }

  //<dolist-item>のindex番号の取得
  function todoCountNo(listName) {
    const listItemCount = $(listName);

    //dolist-contents(donelist-countents)の子要素の数を取得
    console.log(listItemCount[0].childElementCount);
    return listItemCount[0].childElementCount;
  }

  function buttonElementAddEvent(element) {
    $(element.children("button")).on("click", function () {
      //clickされたdolist-itemをdo-list(doneList)から削除
      element.remove();
      //表示領域の更新
      displayDoDonelist();
    });
  }
});
