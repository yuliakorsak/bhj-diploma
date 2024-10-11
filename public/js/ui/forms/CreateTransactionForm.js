/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor(element) {
    super(element);
    this.renderAccountsList();
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    const select = this.element.querySelector('.accounts-select');
    select.innerHTML = '';
    Account.list({}, (err, response) => {
      if (err) {
        console.error(err);
        return;
      }
      if (response.data) {
        response.data.forEach(item => {
          const option = `<option value="${item.id}">${item.name}</option>`;
          select.insertAdjacentHTML('beforeend', option);
        });
      }
    })
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(data) {
    Transaction.create(data, (err, response) => {
      if (err) {
        console.error(err);
        return;
      }
      if (response.success) {
        App.update();
        this.element.reset();
        const modal = this.element.closest('.modal').getAttribute('data-modal-id');
        App.getModal(modal).close();
      }
      else {
        alert(response.error);
      }
    });
  }
}