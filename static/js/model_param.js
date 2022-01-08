
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


//-----------------------------------------------------------------
//RandomForestRegressor

const getRandomForestRegressorParams = () => {
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
    let mse = document.createElement('option');
    let mae = document.createElement('option');
    mse.setAttribute('value', 'mse');
    mse.appendChild(document.createTextNode('mse'));
    mae.setAttribute('value', 'mae');
    mae.appendChild(document.createTextNode('mae'));
    criterion.setAttribute('name', 'model_param_2');
    criterion.setAttribute('id', 'model_param_2');
    criterion.appendChild(mse);
    criterion.appendChild(mae);
    criterion_label.innerHTML = 'criterion';
    criterion_label.setAttribute('for', 'model_param_2');
    td2.appendChild(criterion_label);
    td2.appendChild(criterion);

    //max_depth td3_max_depth
    let td3 = document.createElement('li');
    let max_depth_label = document.createElement('label');
    let max_depth = document.createElement('input');
    max_depth.setAttribute('id', 'model_param_3');
    max_depth.setAttribute('type', 'checkbox');
    max_depth.setAttribute('value', '');
    max_depth_label.innerHTML = 'max_depth';
    max_depth_label.setAttribute('for', 'model_param_3');
    max_depth.onchange = function () { maxDepthFunc(td3) };
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
    min_samples_split_label.innerHTML = 'min_samples_split';
    min_samples_split_label.setAttribute('for', 'model_param_4');
    td4.appendChild(min_samples_split_label);
    td4.appendChild(min_samples_split);

    //max_leaf_nodes
    let td5 = document.createElement('li');
    let max_leaf_nodes_label = document.createElement('label');
    let max_leaf_nodes = document.createElement('input');
    max_leaf_nodes.setAttribute('type', 'checkbox');
    max_leaf_nodes.setAttribute('id', 'model_param_5');
    max_leaf_nodes.setAttribute('value', '');
    max_leaf_nodes_label.innerHTML = 'max_leaf_nodes';
    max_leaf_nodes_label.setAttribute('for', 'model_param_5');
    max_leaf_nodes.onchange = function () { maxLeafNodesFunc(td5) };
    td5.appendChild(max_leaf_nodes_label);
    td5.appendChild(max_leaf_nodes);

    return [td1, td2, td3, td4, td5];
}



//-----------------------------------------------------------------
//XGBoost
//https://xgboost.readthedocs.io/en/latest/parameter.html
//https://qiita.com/FJyusk56/items/0649f4362587261bd57a

const getXGBoostParams = () => {

    //max_depth
    let td1 = document.createElement('li');
    let max_depth_xgb_label = document.createElement('label');
    let max_depth_xgb = document.createElement('input');
    max_depth_xgb.setAttribute('name', 'model_param_1');
    max_depth_xgb.setAttribute('id', 'model_param_1');
    max_depth_xgb.setAttribute('type', 'number');
    max_depth_xgb.setAttribute('value', '6');
    max_depth_xgb.setAttribute('max', '1000');
    max_depth_xgb.setAttribute('min', '0');
    max_depth_xgb_label.innerHTML = 'max_depth';
    max_depth_xgb_label.setAttribute('for', 'model_param_1');
    td1.appendChild(max_depth_xgb_label);
    td1.appendChild(max_depth_xgb);

    //eta
    let td2 = document.createElement('li');
    let eta_xgb_label = document.createElement('label');
    let eta_xgb = document.createElement('input');
    eta_xgb.setAttribute('step', '0.1');
    eta_xgb.setAttribute('name', 'model_param_2');
    eta_xgb.setAttribute('id', 'model_param_2');
    eta_xgb.setAttribute('type', 'number');
    eta_xgb.setAttribute('value', '0.3');
    eta_xgb.setAttribute('max', '1');
    eta_xgb.setAttribute('min', '0');
    eta_xgb_label.innerHTML = 'learning_rate';
    eta_xgb_label.setAttribute('for', 'model_param_2');
    td2.appendChild(eta_xgb_label);
    td2.appendChild(eta_xgb);

    //objective
    let td3 = document.createElement('li');
    let objective_xgb_label = document.createElement('label');
    let objective_xgb = document.createElement('select');
    let linear = document.createElement('option');
    let softmax = document.createElement('option');
    objective_xgb.setAttribute('id', 'model_param_3');
    linear.setAttribute('value', 'Regressor');
    linear.appendChild(document.createTextNode('Regressor'));
    softmax.setAttribute('value', 'Classifier');
    softmax.appendChild(document.createTextNode('Classifier'));
    objective_xgb_label.innerHTML = 'objective';
    objective_xgb_label.setAttribute('for', 'model_param_3');
    objective_xgb.setAttribute('name', 'model_param_3');
    objective_xgb.appendChild(linear);
    objective_xgb.appendChild(softmax);
    td3.appendChild(objective_xgb_label);
    td3.appendChild(objective_xgb);

    //num_round
    let td4 = document.createElement('li');
    let num_round_xgb_label = document.createElement('label');
    let num_round_xgb = document.createElement('input');
    num_round_xgb.setAttribute('name', 'model_param_4');
    num_round_xgb.setAttribute('id', 'model_param_4');
    num_round_xgb.setAttribute('type', 'number');
    num_round_xgb.setAttribute('value', '10');
    num_round_xgb.setAttribute('max', '100');
    num_round_xgb.setAttribute('min', '1');
    num_round_xgb_label.innerHTML = 'num_round';
    num_round_xgb_label.setAttribute('for', 'model_param_4');
    td4.appendChild(num_round_xgb_label);
    td4.appendChild(num_round_xgb);

    // subsample
    let td5 = document.createElement('li');
    let subsample_label = document.createElement('label');
    let subsample = document.createElement('input');
    subsample.setAttribute('step', '0.1');
    subsample.setAttribute('name', 'model_param_5');
    subsample.setAttribute('id', 'model_param_5');
    subsample.setAttribute('type', 'number');
    subsample.setAttribute('value', '0.3');
    subsample.setAttribute('max', '1');
    subsample.setAttribute('min', '0');
    subsample_label.innerHTML = 'subsample';
    subsample_label.setAttribute('for', 'model_param_5');
    td5.appendChild(subsample_label);
    td5.appendChild(subsample);


    return [td1, td2, td3, td4, td5];
}