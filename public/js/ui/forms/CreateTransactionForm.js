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
    Account.list({}, (err, response) => {
      if (err) {
        console.error(err);
        return;
      }
      if (response.data) {
        const innerHtml = response.data.reduce((options, dataItem) => {
          return options + `<option value="${dataItem.id}">${dataItem.name}</option>`;
        }, '');
        select.innerHTML = innerHtml;
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