import { DirectiveBinding } from "vue";

const lazyLoad = {
    mounted(el: HTMLElement, binding: DirectiveBinding) {
        console.log("Lazy load directive mounted");

        function loadImage() {
            const imageElement = el as HTMLImageElement;
            console.log("Loading image", imageElement.dataset.src);
            if (imageElement.dataset.src) {
                imageElement.src = imageElement.dataset.src;
            }
        }

        function handleIntersect(
            entries: IntersectionObserverEntry[],
            observer: IntersectionObserver
        ) {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    console.log("Image intersecting", entry.target);
                    loadImage();
                    observer.unobserve(el);
                }
            });
        }

        function createObserver() {
            const options = {
                root: null,
                threshold: 0.1,
            };
            const observer = new IntersectionObserver(handleIntersect, options);
            observer.observe(el);
        }

        if (!window.IntersectionObserver) {
            loadImage();
        } else {
            createObserver();
        }
    },
};

export default lazyLoad;
