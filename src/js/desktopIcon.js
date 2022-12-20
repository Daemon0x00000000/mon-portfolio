
export class DesktopIcon
{
    constructor(options)
    {
        this.title = options.title;
        this.icon = options.icon;
        this.action = options.action;
    }

    onClick(element)
    {
        element.on('click', this.action);
    }

    render()
    {
        let icon = $(`<div class="desktop__icon">
            ${$('<div class="desktop__icon__image bgSize">').css('background-image', `url(${this.icon})`).prop('outerHTML')}
            <span class="desktop__icon__name">${this.title}</span>`);
        this.onClick(icon);
        icon.appendTo('.desktop');
        return icon;
    }
}