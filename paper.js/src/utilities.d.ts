import paper from "../lib/paper/paper-full";

declare namespace utilities {
    class PaperAnimation {
        /**
         * @param {string} type - animation type
         * @param {number} duration - animation duration
         * @param {paper.Item} node - node to apply animation on
         */

        /** @function
         * @name onFinish - do something after animation finishes
         * @returns {number}
         */
        constructor(type: string, duration: number, node: paper.Item)

        /** @function
         * @name progress - progress the animation on each frame
         * @returns {boolean}
         */
        progress() {
            return 1;
        }

        /** @function
         * @name onFinish - progress the animation on each frame
         * @returns {number}
         */
        onFinish() {
            return true;
        }

        extend(args) {
            let res = Object.create(this);
            for (let field in args) {
                res[field] = args[field];
            }
            return res;
        }
    }
}