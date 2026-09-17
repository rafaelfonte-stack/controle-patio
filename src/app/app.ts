import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Veiculo } from './models/veiculo';

@Component({
  imports: [FormsModule],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})

export class App {
  proprietario = '';
  placa = '';
  modelo = '';
  dataEntrada = '';

  mensagemErro= '';

  veiculosLista: Veiculo[] = [];
  modalAberto = false;
  vizualizacao: 'card' | 'tabela' ='card';



  abrirModal() {
    this.modalAberto = true;
  }

  fecharModal() {
    this.modalAberto = false;
    this.limparForm();  
  }


validarFormulario():boolean{
  const camposVazios:string[] = [];
   if (!this.proprietario.trim()) {
    camposVazios.push('Nome do proprietário');
  }

  if (!this.placa.trim()) {
    camposVazios.push('Placa do veículo');
  }

  if (!this.modelo.trim()) {
    camposVazios.push('Modelo');
  }

  if (!this.dataEntrada) {
    camposVazios.push('Data de entrada');
  }

  if (camposVazios.length >0){
    this.mensagemErro = 
    `preencha os campos obrigatórios: ${camposVazios.join(', ')}.`;

    return false;
  }

  this.mensagemErro = '';

  return true;
  
}
atualizarMensagemErro() {
  if (this.mensagemErro) {
    this.validarFormulario();
  }
}

  cadastrarVeiculo() {
   if (!this.validarFormulario()){
    return;
  }

    const veiculo: Veiculo = {
      proprietario: this.proprietario,
      placa: this.placa.toUpperCase(),
      modelo: this.modelo,
      dataEntrada: this.dataEntrada,
    };

    const placaExistente = this.veiculosLista.some(
      veiculo => veiculo.placa.toUpperCase() === this.placa.toUpperCase()
    );

    if (placaExistente) {
      alert('A placa ' + veiculo.placa.toLowerCase() + ' já está cadastrada no pátio. Verifique o veículo ou informe outra placa.');
      this.limparForm();
      return;
    }


    this.veiculosLista.push(veiculo);
    console.log('Veículo cadastrado:', veiculo);
    this.fecharModal()

  }
  
  removerVeiculo(placa: string) {

    this.veiculosLista = this.veiculosLista.filter(
      veiculo => veiculo.placa !== placa
    )
  }

  limparForm(form?: NgForm) {
    if (form) {
      form.resetForm();
    }

    this.proprietario = '';
    this.placa = '';
    this.modelo = '';
    this.dataEntrada = '';
    this.mensagemErro = '';

    
  }

  mudarVizualizacao(tipo: 'card' | 'tabela'){
    this.vizualizacao = tipo;
    console.log(this.vizualizacao)
  }
}