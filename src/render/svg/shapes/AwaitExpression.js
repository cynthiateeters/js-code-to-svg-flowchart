import { assignState } from 'shared/utils/composition';

import {
    setupCompleteState,
    setupBasicBehaviour,
    setupInitialSelectors,
    delegateInit
} from './BaseShape';

const ENTITY_FIELD_NAME = 'AwaitExpression';

const getDashedRectangle = (x, y, w, h, theme) => {
    return `<rect x="${x}" y="${y}"
            width="${w}" height="${h}"
            rx="${theme.roundBorder}" ry="${theme.roundBorder}"
            style="fill:${theme.fillColor}; stroke:${theme.strokeColor}; stroke-width:${theme.strokeWidth}; stroke-dasharray:5,3" />`;
};

const setupAwaitBehavior = state => ({
    print(config = {}) {
        const theme = state.theme;
        const { x, y } = state.position,
            { w, h } = state.dimensions;

        return `
                <g>
                   ${getDashedRectangle(x, y, w, h, theme)}
                   ${this.printName()}
                   ${this.printDebugInfo(config)}
                </g>`;
    }
});

export const AwaitExpression = initialState => {
    const state = setupCompleteState(initialState);

    return assignState(state, [setupInitialSelectors, setupBasicBehaviour, setupAwaitBehavior]);
};

export default delegateInit(AwaitExpression, ENTITY_FIELD_NAME);
