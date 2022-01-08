
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

            // contentエリアを作成
            createContent();

            // POSTリクエストの結果を受け取ってHTMLを書き換える
            const columns = JSON.parse(data.values).columns;
            const nullColumns = JSON.parse(data.values).null_columns;

            createTargetMenu(Object.keys(columns));
            createNullMenu(nullColumns);
            createModelMenu();
            createDeleMenu(Object.keys(columns));
            createSubmitButton();
            createImgMenu();

            createGraphMenu();
            createXGraphMenu(Object.keys(columns));
            createYGraphMenu(Object.keys(columns));
            createGraphButton();

            Swal.close();


        } else {

            // contentエリアを作成することで疑似的に削除
            createContent();
            // ファイル名を変更する
            displayFileName('ファイルの読み込みに失敗しました');

            Swal.fire({
                icon: 'error',
                title: 'ファイル取得失敗',
                html: 'ファイルを取得できませんでした<br>学習ができるファイルを選択してください',
                confirmButtonColor: '#384878'
            });

        }

    }).fail(function (data) {
        console.log('Ajax通信 失敗');

        displayFileName('ファイルの読み込みに失敗しました');

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
    const plot = document.getElementById('plot_graph');

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
            plot.src = "data:image/png:base64," + img_data;

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


// グラフ表示時
const graphHandler = () => {

    const formData = new FormData(document.getElementById("upload_form"));
    const plot = document.getElementById('plot_graph');

    Swal.fire({
        title: 'グラフの準備中・・・',
        allowOutsideClick: false
    });

    swal.showLoading();

    $.ajax("/plot", {

        type: "post",
        data: formData, // POSTでサーバーに送信するデータ
        processData: false,
        contentType: false,
        dataType: "json",

    }).done(function (data) { // 成功した場合実行される
        console.log("Ajax通信 成功");

        const result = JSON.parse(data.values).result
        const img_data = JSON.parse(data.values).img_data

        if (result == "0") {

            plot.src = "data:image/png:base64," + img_data;

            Swal.fire({
                title: 'グラフ結果',
                imageUrl: "data:image/png:base64," + img_data,
                // imageAlt: 'Custom image',
                confirmButtonColor: '#384878'
            })

        } else if (result == "-1") {

            const message = 'Webデータを受け取ることができませんでした<br>ページを読み込みなおして再度実行してください';

            Swal.fire({
                icon: 'error',
                title: 'データが取得できませんでした',
                html: message,
                confirmButtonColor: '#384878'
            });

        } else if (result == "-2") {

            const message = 'グラフ表示がタイムアウト処理されました<br>適切なグラフを選択してください';

            Swal.fire({
                icon: 'error',
                title: 'タイムアウトしました！',
                html: message,
                confirmButtonColor: '#384878'
            });

        }

    }).fail(function (data) { // 失敗した場合実行される
        console.log("Ajax通信 失敗");
    });

}