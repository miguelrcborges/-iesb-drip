function calcula() {
    const inputs = document.querySelectorAll("input");

    const volume = Number(inputs[0].value);
    const caudal = Number(inputs[1].value);
    const gli= Number(inputs[2].value);
    const glu= Number(inputs[3].value);

    const MIU_MAX = 0.26;
    const XM = 7.62;
    const YX_S = 0.043;
    const YP_S_GLI = 0.133;
    const YP_S_GLU = 0.743;
    const YP_X = 3.09;
    
    const gliPrice = 0.01708;
    const gluPrice = 213;
    const APGPrice = 2500;


    let miu = caudal / volume;
    let X = XM * (1 - miu / MIU_MAX);
    let gliInicial = gli + (1 / YX_S + YP_X/YP_S_GLI) * X;
    let gluInicial = glu + YP_X / YP_S_GLU * X;
    let P = miu * YP_X * X * volume / caudal;
    let massP = P * caudal;
    let massGli = caudal * gliInicial;
    let massGlu = caudal * gluInicial;

    document.querySelector("#massaProduto").textContent = `Massa de protudo na saída: ${Math.round(massP * 10000) / 10000} g/h`;
    document.querySelector("#massaGli").textContent = `Massa de glicose na entrada: ${Math.round(massGli * 10000) / 10000} g/h`;
    document.querySelector("#massaGlu").textContent = `Massa de glutamato na entrada: ${Math.round(massGlu * 10000) / 10000} g/h`;
    document.querySelector("#APG").textContent = `Concentração de produto no reator: ${Math.round(P * 10000)/10000} g/L`
    document.querySelector("#miu").innerHTML = `Taxa de crescimento: ${Math.round(miu * 10000)/10000} h<sup>-1</sup>`;
    document.querySelector("#gliInicial").textContent = `Concentração de glicose à entrada: ${Math.round(gliInicial * 10000)/10000} g/L`;
    document.querySelector("#gluInicial").textContent = `Concentração de glutamato à entrada: ${Math.round(gluInicial * 10000)/10000} g/L`;
    document.querySelector("#X").textContent = `Concentração de biomassa no reator: ${Math.round(X * 10000)/10000} g/L`;

    let custos = gliPrice * massGli + gluPrice * massGlu;
    let ganhos = APGPrice * massP;
    let profit = ganhos - custos;

    document.querySelector("#custo").textContent = `Custos: ${Math.round(custos * 100) / 100}€`;
    document.querySelector("#ganho").textContent = `Ganhos: ${Math.round(ganhos * 100) / 100}€`;
    document.querySelector("#profit").textContent = `Profit: ${Math.round(profit * 100) / 100}€`;
}

document.querySelectorAll("input").forEach((input) => input.addEventListener('change', calcula));

calcula();