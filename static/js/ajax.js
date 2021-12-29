
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

            console.log(result);


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