/**
 * ID Generator Service Implementation — Asiora prefixes.
 */

import type { DomainCode } from '@asiora/core/_shared/helpers';
import { DOMAIN_PREFIX_MAP, isValidDomainId } from '@asiora/core';
import { ulid } from 'ulid';
import type { IdGeneratorService } from '@asiora/services/_shared';

export function generateIdWithPrefix(prefix: string): string {
  if (!prefix || prefix.length !== 3 || !/^[a-z]{3}$/.test(prefix)) {
    throw new Error(
      `Invalid domain prefix: "${prefix}". Must be exactly 3 lowercase letters.`
    );
  }
  const id = `${prefix}_${ulid().toLowerCase()}`;
  if (!isValidDomainId(id)) {
    throw new Error(`Generated ID "${id}" failed validation.`);
  }
  return id;
}

export class DefaultIdGeneratorService implements IdGeneratorService {
  tntId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.tenant);
  }
  keyId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.apiKey);
  }
  idnId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.identity);
  }
  autId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.auth);
  }
  iniId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.initiative);
  }
  scnId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.scenario);
  }
  dilId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.diligence);
  }
  alnId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.alliance);
  }
  gatId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.gate);
  }
  dcsId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.decision);
  }
  intId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.intake);
  }
  pckId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.pack);
  }
  dplId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.dataplay);
  }
  ovlId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.overlap);
  }
  generateIdForDomain(domainCode: DomainCode): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP[domainCode]);
  }
}

let idGeneratorService: DefaultIdGeneratorService | null = null;

export function getIdGeneratorService(): DefaultIdGeneratorService {
  if (!idGeneratorService) {
    idGeneratorService = new DefaultIdGeneratorService();
  }
  return idGeneratorService;
}
