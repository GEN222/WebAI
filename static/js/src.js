
// content作成
const createContent = () => {

    const contentAreaClass = 'main_section';

    const contentId = 'content';
    removeElement(contentId);

    const wrapper = document.getElementById('wrapper');

    const content = document.createElement('div');
    content.setAttribute('id', contentId);
    content.setAttribute('class', 'content');

    const paramArea = document.createElement('div');
    const paramAreaId = 'param_area';
    paramArea.setAttribute('id', paramAreaId);
    paramArea.setAttribute('class', contentAreaClass);
    content.appendChild(paramArea);

    const graphArea = document.createElement('div');
    const graphAreaId = 'graph_area';
    graphArea.setAttribute('id', graphAreaId);
    graphArea.setAttribute('class', contentAreaClass);
    content.appendChild(graphArea);

    const imageArea = document.createElement('div');
    const imageAreaId = 'image_area';
    imageArea.setAttribute('id', imageAreaId);
    imageArea.setAttribute('class', contentAreaClass);
    content.appendChild(imageArea);


    wrapper.appendChild(content);

}


// サンプル選択時のアラート内のselect表示
const alertSelect = () => {

    const values = ['boston.csv', 'titanic.csv', 'dummy.csv'];

    const div = document.createElement('div');
    div.setAttribute('class', 'general_select select1');

    const select = document.createElement('select');
    select.onchange = function () {
        sampleHandler(this.value);
        displayFileName(this.value);
    };
    select.appendChild(createOption('default', 'サンプルを選択してください'));

    for (let i = 0; i < values.length; i++) {

        select.appendChild(createOption(values[i], values[i]));

    }

    div.appendChild(select);

    Swal.fire({
        icon: 'info',
        title: 'サンプルを選んでください',
        html: div,
        confirmButtonColor: '#384878'
    })

}


// ファイルの名前を表示
const displayFileName = (filename) => {

    const fileNameArea = document.getElementById('file_name');
    fileNameArea.innerHTML = filename;

}


// 引数のidの要素が存在する場合、削除する
const removeElement = (id) => {

    if (document.getElementById(id)) {

        const element = document.getElementById(id);
        element.remove();

    }

}


// textを生成し戻す
const createText = (textValue, key) => {

    const div = document.createElement('div');
    const span = document.createElement('span');
    span.setAttribute('class', 'info_button');
    span.innerHTML = "？";
    span.onclick = function () { alertInfo(key); };
    const text = document.createElement('p');
    text.setAttribute('class', 'info_message');
    text.innerHTML = textValue;

    text.appendChild(span);
    div.appendChild(text);
    return div

}

const alertInfo = (key) => {

    // 引数に応じて表示する説明を変更する

    const info_html = {
        'target': '<p>目的変数とは、<br>教師あり学習において求めたい値のことです</p><p>ここで選択した値をAIが予測します</p><p>細かい項目についてはサンプルデータを参照ください</p>',
        'null': '<p>欠損値とは、欠落しているデータのことです</p><p>欠損値への処理は非常に機械学習上重要な項目です</p><p>このアプリでは置き換えの種類は、<br>数値データ、文字データによって変えています</p>',
        'model': '<p>モデルとは学習させる手法のことです</p><p>RandomForestClassifierは分類、<br>RandomForestRegressorは回帰、<br>Xgboostはパラメータのobjectiveにて、<br>Classifierで分類、Regressorは回帰となります</p><p>詳しくは、モデル解説を参照ください</p>',
        'dele': '<p>機械学習において、<br>与えられたデータがすべて必要だとは限りません</p><p>明らかに関係がない、欠損値が多いなど、<br>学習において邪魔になる場合があります</p><p>他にも、データによっては差別的な値などもあり、<br>不必要なデータは見極めなければなりません</p>',
        'graph': '<p>グラフはカテゴリ変数用、量的変数用に分かれています</p><p>カテゴリ変数とは、<br>性別や所属部署などカテゴリ分けできる値のことで、<br>量的変数とは、<br>年齢や○○件数など連続している値のことです</p><p>棒グラフはカテゴリ変数用、<br>ヒストグラムや散布図は量的変数用です<br>可視分布はカテゴリ変数と量的変数を比較できます</p>',
        'graphX': '<p>1要素のグラフには可視化したい項目、<br>2要素のグラフには<br>カテゴリ変数や横軸に設定したい項目を設定します</p>',
        'graphY': 'Y軸には量的変数や縦軸、<br>凡例としたい項目を設定します</p>',
    }
    const info_title = {
        'target': '目的変数とは',
        'null': '欠損値値とは',
        'model': 'モデルについて',
        'dele': '削除する値とは',
        'graph': 'グラフについて',
        'graphX': 'X軸の項目について',
        'graphY': 'Y軸の項目について'
    }

    Swal.fire({
        icon: 'question',
        title: info_title[key],
        html: info_html[key],
        confirmButtonColor: '#384878'
    })
}


const createDeleMenu = (values) => {

    const wrapper = document.getElementById('param_area');
    const deleMenuId = 'dele_menu';

    removeElement(deleMenuId);

    const deleMenu = document.createElement('div');
    deleMenu.setAttribute('id', deleMenuId);

    // checkboxのdiv
    const checkboxMenu = document.createElement('div');

    for (var i = 0; i < values.length; i++) {
        const input = document.createElement('input');
        const label = document.createElement('label');
        const br = document.createElement('br');
        const value = values[i];
        const id = 'dele_parameters_area_' + value;
        const name = 'dele_param';
        input.setAttribute('type', 'checkbox');
        input.setAttribute('value', value);
        input.setAttribute('id', id);
        input.setAttribute('name', name);
        input.setAttribute('class', 'check-inline__input');
        label.setAttribute('for', id);
        label.setAttribute('class', 'check-inline__label');
        label.innerHTML = value;

        checkboxMenu.appendChild(input);
        checkboxMenu.appendChild(label);

    }

    deleMenu.appendChild(createText('削除する値を選択してください', 'dele'));
    deleMenu.appendChild(checkboxMenu);
    wrapper.appendChild(deleMenu);
}

const createSubmitButton = () => {

    const wrapper = document.getElementById('param_area');
    const subBtnId = 'sub_btn';

    removeElement(subBtnId);

    const subBtnMenu = document.createElement('div');
    subBtnMenu.setAttribute('id', subBtnId)

    const button = document.createElement('button');
    button.setAttribute('type', 'submit');
    button.onclick = function () {
        paramHandler();
    };
    button.setAttribute('class', 'btn');
    button.innerHTML = '学習させる';

    subBtnMenu.appendChild(button);
    wrapper.appendChild(subBtnMenu);

}


const createImgMenu = () => {

    const wrapper = document.getElementById('image_area');

    const imgMenuId = 'img_menu';
    const imgMenuClass = 'img_menu';
    removeElement(imgMenuId);

    const imgMenu = document.createElement('div');
    imgMenu.setAttribute('id', imgMenuId);

    const img = document.createElement('img');
    const imgId = 'plot_graph';
    img.setAttribute('id', imgId);
    img.setAttribute('class', imgMenuClass);
    img.onclick = function () {
        alertImage();
    };

    imgMenu.appendChild(img);
    wrapper.appendChild(imgMenu);

}

const alertImage = () => {

    const img = document.getElementById('plot_graph');
    const src = img.src;

    Swal.fire({
        title: 'グラフ結果',
        imageUrl: src,
        imageAlt: 'Custom image',
        confirmButtonColor: '#384878'
    })

}

// option生成
const createOption = (value, html) => {

    const option = document.createElement('option');
    option.setAttribute("value", value);
    option.innerHTML = html;

    return option
}