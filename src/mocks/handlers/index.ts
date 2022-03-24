import * as settingHandlers from '@mocks/handlers/setting';
import * as infoHandlers from '@mocks/handlers/info';

export const handlers = [...Object.values(settingHandlers), ...Object.values(infoHandlers)];
