
export class Modal {
    constructor(options) {
        this.title = options.title;
        this.body = options.body;
        this.resizable = options.resizable;

    }

    resizeEventListener()
    {
        this.modal.on('resize', () => {
            this.modal.draggable('option', 'containment', [0, 0, $(parent).width() - this.modal.width() -5, $(parent).height() - this.modal.height() - 5]);
        });
    }

    mouseDownEventListener()
    {
        this.modal.mousedown(() => {
            this.modal.css('z-index', 1000);
            this.modal.siblings().css('z-index', 10);
        });
    }

    checkSize() {
        setInterval(() => {
            if (this.width !== this.modal.width() || this.height !== this.modal.height()) {
                this.modal.trigger('resize');
                this.width = this.modal.width();
                this.height = this.modal.height();
            }
        }, 100);
    }

    initialize() {
        this.modal.appendTo($('.container'));
        this.modal.draggable({
            handle: '.modal__header',
            containment: [0, 0, $(window).width() - this.modal.width() -5, $(window).height() - this.modal.height() - 5]
        });
        this.resizable && this.modal.resizable();
        this.modal.hide();

    }

    render() {
         this.modal = $(`
            <div class="modal">
                <div class="modal__header">
                    <div class="modal__header__title">${this.title}</div>
                    <div class="modal__header__buttons">
                        <div class="modal__header__buttons__button yellow"></div>
                        <div class="modal__header__buttons__button green"></div>
                        <div class="modal__header__buttons__button red"></div>
                    </div>
                </div>    
                ${this.body}
            </div>
        `);
        $('.modal__header__buttons__button.red', this.modal).click(() => this.modal.fadeOut(500));
        this.initialize();


        this.mouseDownEventListener();
        this.resizeEventListener();
        this.checkSize();

        return this.modal;
    }

}
