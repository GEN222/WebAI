
// サンプルファイルを選択した場合
const sampleHandler = (file) => {

    $.ajax("/sample", {

        type: "post",
        data: file, // POSTでサーバーに送信するデータ
        processData: false,
        contentType: false,
        dataType: "json",

    }).done(function (data) { // 成功した場合実行される
        console.log("Ajax通信 成功");

        const result = JSON.parse(data.values).result;

        if (result == "0") {

            // POSTリクエストの結果を受け取ってHTMLを書き換える
            const columns = JSON.parse(data.values).columns;
            const nullColumns = JSON.parse(data.values).null_columns;

            createTargetMenu(Object.keys(columns));


        } else {

            Swal.fire({
                icon: 'error',
                title: 'ファイル取得失敗',
                html: 'ファイルを取得できませんでした<br>学習ができるファイルを選択してください',
                confirmButtonColor: '#384878'
            });

        }

    }).fail(function (data) {
        console.log("Ajax通信 失敗");

        Swal.fire({
            icon: 'error',
            title: 'ファイル取得失敗',
            html: 'ファイルを取得できませんでした<br>学習ができるファイルを選択してください',
            confirmButtonColor: '#384878'
        });

    });
}