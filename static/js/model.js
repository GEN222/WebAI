
const creatModelMenu = () => {

    const wrapper = document.getElementById('wrapper');

    const modelMenuId = 'model_menu';

    removeElement(modelMenuId);

    const modelMenu = document.createElement('div');
    modelMenu.setAttribute('id', modelMenuId);

    const select = document.createElement('select');
    select.setAttribute('name', 'model');
    select.setAttribute('id', 'model');
    select.onchange = function () {
        // モデルに応じて表示するパラメータを変更
        creatModelParamMenu(this);
    }

    // 最初に表示される選択肢
    const defaultOption = document.createElement('option');
    const defaultLabel = document.createElement('label');
    defaultOption.setAttribute('value', '');
    defaultLabel.innerHTML = 'モデルを選択してください';
    defaultOption.appendChild(defaultLabel);
    select.appendChild(defaultOption);

    const modelList = ['RandomForestClassifier', 'RandomForestRegressor', 'XGBoost'];

    // modelListの内容をselectに加える
    for (let i = 0; i < modelList.length; i++) {

        const option = document.createElement('option');
        const label = document.createElement('label');
        option.setAttribute('value', modelList[i]);
        option.setAttribute('name', 'model');
        label.innerHTML = modelList[i];
        option.appendChild(label);
        select.appendChild(option);

    }

    modelMenu.appendChild(select);
    wrapper.appendChild(modelMenu);

}


// モデルのハイパーパラメータを表示
const creatModelParamMenu = (model) => {

    const modelMenu = document.getElementById("model_menu");

    const modelParamMenuId = 'model_param_menu';

    removeElement(modelParamMenuId);

    const modelParamMenu = document.createElement('div');
    modelParamMenu.setAttribute('id', modelParamMenuId);

    const ul = document.createElement('ul');

    if (model.value == 'RandomForestClassifier') {

        modelParams = getRandomForestClassifierParams();

        for (let i = 0; i < modelParams.length; i++) {
            ul.appendChild(modelParams[i])
        }

        modelParamMenu.appendChild(ul);

    } else if (model.value == "RandomForestRegressor") {

        modelParams = getRandomForestRegressorParams();

        for (let i = 0; i < modelParams.length; i++) {
            ul.appendChild(modelParams[i])
        }

        modelParamMenu.appendChild(ul);

    } else if (model.value == "XGBoost") {

        modelParams = getXGBoostParams();

        for (let i = 0; i < modelParams.length; i++) {
            ul.appendChild(modelParams[i])
        }

        modelParamMenu.appendChild(ul);
    }

    modelMenu.appendChild(modelParamMenu);
}


//-----------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------
//---------modelパラメーターのみ可読性のために変数規則をスネークケースにしています！！---------
//-----------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------


// ハイパーパラメータ内のmaxDepthとmaxLeafNodesの挙動
const maxDepthFunc = (element) => {

    if (!element.childNodes[2]) {

        const max_depth_int = document.createElement('input');
        max_depth_int.setAttribute('type', 'number');
        max_depth_int.setAttribute('name', 'model_param_3');
        max_depth_int.setAttribute('value', '100');
        max_depth_int.setAttribute('max', '1000');
        max_depth_int.setAttribute('min', '1');
        element.appendChild(max_depth_int);

    } else {

        element.removeChild(element.childNodes[2]);

    }
}


const maxLeafNodesFunc = (element) => {

    if (!element.childNodes[2]) {

        let max_leaf_nodes_int = document.createElement('input');
        max_leaf_nodes_int.setAttribute('type', 'number');
        max_leaf_nodes_int.setAttribute('name', 'model_param_5');
        max_leaf_nodes_int.setAttribute('value', '15');
        max_leaf_nodes_int.setAttribute('max', '200');
        max_leaf_nodes_int.setAttribute('min', '0');
        element.appendChild(max_leaf_nodes_int);

    } else {

        element.removeChild(element.childNodes[2]);

    }
}