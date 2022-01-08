
// サンプルファイルを選択した場合
const sampleHandler = (file) => {

    $.ajax('/sample', {

        type: 'post',
        data: file, // POSTでサーバーに送信するデータ
        processData: false,
        contentType: false,
        dataType: 'json',

    }).done(function (data) { // 成功した場合実行される
        console.log('Ajax通信 成功');

        const result = JSON.parse(data.values).result;

        if (result == '0') {

            // POSTリクエストの結果を受け取ってHTMLを書き換える
            const columns = JSON.parse(data.values).columns;
            const nullColumns = JSON.parse(data.values).null_columns;

            createTargetMenu(Object.keys(columns));
            createNullMenu(nullColumns);

            creatModelMenu();
            createDeleMenu(Object.keys(columns));
            creatSubmitButton();
            createImgMenu();

            Swal.close();


        } else {

            Swal.fire({
                icon: 'error',
                title: 'ファイル取得失敗',
                html: 'ファイルを取得できませんでした<br>学習ができるファイルを選択してください',
                confirmButtonColor: '#384878'
            });

        }

    }).fail(function (data) {
        console.log('Ajax通信 失敗');

        Swal.fire({
            icon: 'error',
            title: 'ファイル取得失敗',
            html: 'ファイルを取得できませんでした<br>学習ができるファイルを選択してください',
            confirmButtonColor: '#384878'
        });

    });
}


// モデル学習時実行
const paramHandler = () => {

    const formData = new FormData(document.getElementById("upload_form"));

    // 学習中を終了まで表示
    Swal.fire({
        title: '学習中・・・',
        allowOutsideClick: false
    });

    swal.showLoading();

    $.ajax("/param", {

        type: "post",
        data: formData, // POSTでサーバーに送信するデータ
        processData: false,
        contentType: false,
        dataType: "json",

    }).done(function (data) { // 成功した場合実行される
        console.log("Ajax通信 成功");

        const result = JSON.parse(data.values).result
        const message = JSON.parse(data.values).message

        if (result == -1) {

            Swal.fire({
                icon: 'error',
                title: '学習中にエラーが発生しました',
                text: message,
                confirmButtonColor: '#384878'
            });

        } else {

            // 学習結果を画像で表示
            const img_data = JSON.parse(data.values).img_data;

            Swal.fire({
                title: '学習結果',
                // text: '学習結果',
                imageUrl: "data:image/png:base64," + img_data,
                confirmButtonColor: '#384878'
            })

        }

    }).fail(function (data) { // 失敗した場合実行される
        console.log("Ajax通信 失敗");

        Swal.fire({
            icon: 'error',
            title: '学習中にエラーが発生しました',
            confirmButtonColor: '#384878'
        });

    });
}