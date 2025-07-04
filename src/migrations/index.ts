import * as migration_20250629_202644_initial from './20250629_202644_initial';
import * as migration_20250703_132323 from './20250703_132323';
import * as migration_20250704_125644 from './20250704_125644';

export const migrations = [
  {
    up: migration_20250629_202644_initial.up,
    down: migration_20250629_202644_initial.down,
    name: '20250629_202644_initial',
  },
  {
    up: migration_20250703_132323.up,
    down: migration_20250703_132323.down,
    name: '20250703_132323',
  },
  {
    up: migration_20250704_125644.up,
    down: migration_20250704_125644.down,
    name: '20250704_125644'
  },
];
