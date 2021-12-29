
// サンプル選択時のアラート内のselect表示
const alertSelect = () => {

    const values = ["boston.csv", "titanic.csv", "dummy.csv"];

    const div = document.createElement('div');
    div.setAttribute('class', 'cp_ipselect cp_sl01');

    const select = document.createElement('select');
    select.setAttribute('onchange', 'sampleHandler(this.value);')

    const defaultOption = document.createElement('option');
    const defaultLabel = document.createElement("label");
    defaultOption.setAttribute("value", "");
    defaultLabel.innerHTML = "サンプルを選択してください";
    defaultOption.appendChild(defaultLabel);
    select.appendChild(defaultOption);

    for (let i = 0; i < values.length; i++) {

        const option = document.createElement('option');
        option.setAttribute("value", values[i]);
        option.innerHTML = values[i];

        select.appendChild(option);

    }

    div.appendChild(select);

    Swal.fire({
        title: 'サンプルを選んでください',
        html: div,
        confirmButtonColor: '#384878'
    })

}