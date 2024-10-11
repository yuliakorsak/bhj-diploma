/**
 * Класс CreateAccountForm управляет формой
 * создания нового счёта
 * */
class CreateAccountForm extends AsyncForm {
  /**
   * Создаёт счёт с помощью Account.create и закрывает
   * окно в случае успеха, а также вызывает App.update()
   * и сбрасывает форму
   * */
  onSubmit(data) {
    Account.create(data, (err, response) => {
      if(err) {
        console.log(err);
        return;
      }
      if (response && response.success) {
        App.update();
        this.element.reset();
        App.getModal('createAccount').close();
      }
      else {
        alert(response.error);
      }
    });
  }
}