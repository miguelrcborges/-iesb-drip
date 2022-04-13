function calcula() {
    const inputs = document.querySelectorAll("input");

    const volume = Number(inputs[0].value);
    const caudal = Number(inputs[1].value);
    const gliInicial = Number(inputs[2].value);
    const gluInicial = Number(inputs[3].value);

    const MIU_MAX = 0.26;
    const XM = 7.62;
    const YX_S = 0.043;
    const YP_S_GLI = 0.133;
    const YP_S_GLU = 0.743;
    const YP_X = 3.09;

    let miu = caudal / volume;
    let X = XM * (1 - miu / MIU_MAX);
    let gli = gliInicial - (1 / YX_S + YP_X/YP_S_GLI) * X 
    let glu = gluInicial - YP_X / YP_S_GLU * X
    let P = miu * YP_X * X * volume / caudal;

    document.querySelector("#APG").textContent = `Concentração de produto no reator: ${Math.round(P * 10000)/10000} g/L`
    document.querySelector("#miu").innerHTML = `Taxa de crescimento: ${Math.round(miu * 10000)/10000} h<sup>-1</sup>`;
    document.querySelector("#gli").textContent = `Concentração de glicose: ${Math.round(gli * 10000)/10000} g/L`;
    document.querySelector("#glu").textContent = `Concentração de glutamato: ${Math.round(glu * 10000)/10000} g/L`;
    document.querySelector("#X").textContent = `Concentração de biomassa no reator: ${Math.round(X * 10000)/10000} g/L`;
}

document.querySelectorAll("input").forEach((input) => input.addEventListener('change', calcula));

calcula();
