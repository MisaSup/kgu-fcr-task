const IpViewer = () => {
  return `
    <section class="ip-viewer">
      <div class="ip-viewer__result" data-ip-result>
        IP ещё не загружен
      </div>
      <button class="ip-viewer__button" type="button" data-ip-show>
        Показать мой IP
      </button>
    </section>
  `;
};

export default IpViewer;
