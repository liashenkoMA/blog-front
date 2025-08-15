import { telegramBot } from "@/app/_utils/telegramApi";
import "./contactform.scss";

export default function ContactForm() {
  return (
    <section className="contactform">
      <div className="contactform__content">
        <h2 className="contactform__title" id="contact__title">
          Контакты
        </h2>
        <div className="contactform__conteiner">
          <form
            className="contactform__form"
            action={async (formData: FormData) => {
              "use server";
              await telegramBot(formData);
            }}
          >
            <div className="contactform__form-inputs">
              <div className="contactform__inputs-contact">
                <label className="contactform__form-field">
                  <span className="contactform__text">Ваше имя: *</span>
                  <input
                    type="text"
                    name="name"
                    placeholder="Введите ваше имя"
                    required
                    minLength={2}
                    maxLength={30}
                    className="contactform__input"
                  ></input>
                  <span className="contactform__error"></span>
                </label>

                <label className="contactform__form-field">
                  <span className="contactform__text">Ваш email: *</span>
                  <input
                    type="email"
                    name="email"
                    placeholder="Введите ваш email"
                    required
                    className="contactform__input"
                  ></input>
                  <span className="contactform__error"></span>
                </label>
              </div>

              <label className="contactform__form-field">
                <span className="contactform__text">Ваше сообщение: *</span>
                <textarea
                  name="message"
                  placeholder="Введите ваше сообщение"
                  required
                  className="contactform__input contactform__input-textarea"
                ></textarea>
                <span className="contactform__error"></span>
              </label>
            </div>
            <p className="contactform__text">
              * Нажимая кнопку «Отправить сообщение» вы даете согласие на
              обработку персональных данных.
            </p>
            <button type="submit" className="contactform__btn">
              Отправить сообщение
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
