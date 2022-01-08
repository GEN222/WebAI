
// name をモデルで共通にする！
// 欠点はモデルのパラメータ名を受け取れなくなるので順番ごとにパラメータを代入する
// name は1.2.3とかでやればモデルごとにパラメータの表示数を変えられる
// post先でモデルの種類に応じてfor文でrequestをとれる

//-----------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------
//---------modelパラメーターのみ可読性のために変数規則をスネークケースにしています！！---------
//-----------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------

//-------------------------------------------------------
//https://ichi.pro/randamufuxoresutohaipa-parame-tachu-ningu-no-bigina-zugaido-77596161963319
//https://qiita.com/FujiedaTaro/items/61ded4ea5643a6204317
//https://scikit-learn.org/stable/modules/generated/sklearn.ensemble.RandomForestClassifier.html
//RandomForestClassifier

const getRandomForestClassifierParams = () => {
    //n_estimators
    let td1 = document.createElement('li');
    let n_estimators_label = document.createElement('label');
    let n_estimators = document.createElement('input');
    n_estimators.setAttribute('name', 'model_param_1');
    n_estimators.setAttribute('id', 'model_param_1');
    n_estimators.setAttribute('type', 'number');
    n_estimators.setAttribute('value', '100');
    n_estimators.setAttribute('max', '1000');
    n_estimators.setAttribute('min', '10');
    n_estimators_label.innerHTML = 'n_estimators';
    n_estimators_label.setAttribute('for', 'model_param_1');
    td1.appendChild(n_estimators_label);
    td1.appendChild(n_estimators);

    //criterion
    let td2 = document.createElement('li');
    let criterion_label = document.createElement('label');
    let criterion = document.createElement('select');
    let gini = document.createElement('option');
    let entropy = document.createElement('option');
    gini.setAttribute('value', 'gini');
    gini.appendChild(document.createTextNode('gini'));
    entropy.setAttribute('value', 'entropy');
    entropy.appendChild(document.createTextNode('entropy'));
    criterion.setAttribute('name', 'model_param_2');
    criterion.setAttribute('id', 'model_param_2');
    criterion.appendChild(gini);
    criterion.appendChild(entropy);
    criterion_label.innerHTML = 'criterion';
    criterion_label.setAttribute('for', 'model_param_2');
    td2.appendChild(criterion_label);
    td2.appendChild(criterion);

    //max_depth
    let td3 = document.createElement('li');
    let max_depth_label = document.createElement('label');
    let max_depth = document.createElement('input');
    max_depth.setAttribute('type', 'checkbox');
    max_depth.setAttribute('value', '');
    max_depth.onchange = function () { maxDepthFunc(td3) };
    max_depth.setAttribute('id', 'model_param_3');
    max_depth_label.setAttribute('for', 'model_param_3');
    max_depth_label.innerHTML = 'max_depth';
    td3.appendChild(max_depth_label);
    td3.appendChild(max_depth);

    //min_samples_split
    let td4 = document.createElement('li');
    let min_samples_split_label = document.createElement('label');
    let min_samples_split = document.createElement('input');
    min_samples_split.setAttribute('type', 'number');
    min_samples_split.setAttribute('name', 'model_param_4');
    min_samples_split.setAttribute('id', 'model_param_4');
    min_samples_split.setAttribute('value', '10');
    min_samples_split.setAttribute('max', '2000');
    min_samples_split.setAttribute('min', '10');
    min_samples_split_label.setAttribute('for', 'model_param_4');
    min_samples_split_label.innerHTML = 'min_samples_split';
    td4.appendChild(min_samples_split_label);
    td4.appendChild(min_samples_split);

    //max_leaf_nodes
    let td5 = document.createElement('li');
    let max_leaf_nodes_label = document.createElement('label');
    let max_leaf_nodes = document.createElement('input');
    max_leaf_nodes.setAttribute('id', 'model_param_5');
    max_leaf_nodes.setAttribute('type', 'checkbox');
    max_leaf_nodes.setAttribute('value', '');
    max_leaf_nodes.onchange = function () { maxLeafNodesFunc(td5) };
    max_leaf_nodes_label.setAttribute('for', 'model_param_5');
    max_leaf_nodes_label.innerHTML = 'max_leaf_nodes';
    td5.appendChild(max_leaf_nodes_label);
    td5.appendChild(max_leaf_nodes);

    return [td1, td2, td3, td4, td5];

}

