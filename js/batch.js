function calcula() {
    const inputs = document.querySelectorAll("input");

    const volume = Number(inputs[0].value);
    const gliInicial = Number(inputs[1].value);
    const gluInicial = Number(inputs[2].value);
    const XInicial = Number(inputs[3].value);
    const tempo = Number(inputs[4].value);

    const MIU_MAX = 0.26;
    const XM = 7.62;
    const YGLI = 46.48889666;
    const YGLU = 4.158815612;
    const YP = 3.09;
    const e = 2.718281828;
    
    const gliPrice = 0.01708;
    const gluPrice = 213;
    const APGPrice = 2500;

    let X = XM / (1 - (XInicial - XM)/(XInicial*e**(MIU_MAX*tempo)));
    let gli = (1 - XM / (XInicial * (e**(MIU_MAX * tempo) - 1) + XM)) * YGLI * (XInicial - XM) + gliInicial;
    let glu = (1 - XM / (XInicial * (e**(MIU_MAX * tempo) - 1) + XM)) * YGLU * (XInicial - XM) + gluInicial;
    let P = - YP * (Math.log(Math.abs(1 + XInicial * (e**(MIU_MAX * tempo) - 1)/XM)) - MIU_MAX * tempo);
    let massProduto = P * volume;
    let massGli = gli * volume;
    let massGlu = glu * volume;
    let miu = MIU_MAX * (1 - 1 / (1 - (XInicial - XM)/(XInicial * e**(MIU_MAX * tempo))));
    
    let custos = gliPrice * massGli + gluPrice * massGlu;
    let ganhos = APGPrice * massProduto;
    let lucro = ganhos - custos;

    document.querySelector("#custo").textContent = `Custos: ${Math.round(custos * 100) / 100}€`;
    document.querySelector("#ganho").textContent = `Ganhos: ${Math.round(ganhos * 100) / 100}€`;
    document.querySelector("#lucro").textContent = `Lucro: ${Math.round(lucro * 100) / 100}€`;

    document.querySelector("#massaProduto").textContent = `Massa de protudo no reator: ${Math.round(massProduto * 10000) / 10000} g`;
    document.querySelector("#massaGli").textContent = `Massa de glicose no reator: ${Math.round(massGli * 10000) / 10000} g`;
    document.querySelector("#massaGlu").textContent = `Massa de glutamato no reator: ${Math.round(massGlu * 10000) / 10000} g`;
    document.querySelector("#APG").textContent =`Concentração de produto de reator: ${Math.round(P * 10000) / 10000} g/L`;
    document.querySelector("#gli").textContent =`Concentração de glicose: ${Math.round(gli * 10000) / 10000} g/L`;
    document.querySelector("#glu").textContent =`Concentração de glutamato: ${Math.round(glu * 10000) / 10000} g/L`;
    document.querySelector("#X").textContent = `Concentração de biomassa no reator: ${Math.round(X * 10000) / 10000} g/L`; 
    document.querySelector("#miu").innerHTML = `Taxa de crescimento: ${Math.round(miu * 10000) / 10000} h<sup>-1</sup>`; 

}

document.querySelectorAll("input").forEach((input) => input.addEventListener('change', calcula));

calcula();