/**
 * IdGeneratorService Port — Asiora domain prefixes.
 */

import type { DomainCode } from '@asiora/core/_shared/helpers';

export interface IdGeneratorService {
  tntId(): string;
  keyId(): string;
  idnId(): string;
  autId(): string;
  iniId(): string;
  scnId(): string;
  dilId(): string;
  alnId(): string;
  gatId(): string;
  dcsId(): string;
  intId(): string;
  pckId(): string;
  dplId(): string;
  ovlId(): string;
  generateIdForDomain(domainCode: DomainCode): string;
}
