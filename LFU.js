/**
 * LFU Cache — O(1) get and put
 *
 * Data structures:
 *   keyMap  : Map<key, { val, freq }>         — O(1) lookup by key
 *   freqMap : Map<freq, Set<key>>             — keys at each frequency, insertion-ordered (LRU within freq)
 *   minFreq : number                          — current minimum frequency for O(1) eviction
 *
 * Interview tip: draw these three structures on the whiteboard before writing any code.
 */

class LFUCache {
  constructor(capacity) {
    this.cap = capacity;
    this.keyMap = new Map(); // key -> { val, freq }
    this.freqMap = new Map(); // freq -> Set<key> (JS Set preserves insertion order)
    this.minFreq = 0;
  }

  // ── Private: increment frequency of an existing key ──────────────────────

  _bump(key) {
    const { val, freq } = this.keyMap.get(key);

    // Update keyMap
    this.keyMap.set(key, { val, freq: freq + 1 });

    // Remove from old freq bucket
    this.freqMap.get(freq).delete(key);
    if (this.freqMap.get(freq).size === 0) {
      this.freqMap.delete(freq);
      if (this.minFreq === freq) this.minFreq++; // minFreq can only go up by 1 here
    }

    // Add to new freq bucket
    if (!this.freqMap.has(freq + 1)) this.freqMap.set(freq + 1, new Set());
    this.freqMap.get(freq + 1).add(key);
  }

  // ── Public API ────────────────────────────────────────────────────────────

  get(key) {
    if (!this.keyMap.has(key)) return -1;
    this._bump(key);
    return this.keyMap.get(key).val;
  }

  put(key, value) {
    if (this.cap === 0) return;

    if (this.keyMap.has(key)) {
      // Update value in place, then bump frequency
      this.keyMap.get(key).val = value;
      this._bump(key);
      return;
    }

    // Evict if at capacity
    if (this.keyMap.size === this.cap) {
      const minBucket = this.freqMap.get(this.minFreq);
      const evictKey = minBucket.values().next().value; // oldest key at minFreq
      minBucket.delete(evictKey);
      if (minBucket.size === 0) this.freqMap.delete(this.minFreq);
      this.keyMap.delete(evictKey);
    }

    // Insert new key at freq 1
    this.keyMap.set(key, { val: value, freq: 1 });
    if (!this.freqMap.has(1)) this.freqMap.set(1, new Set());
    this.freqMap.get(1).add(key);
    this.minFreq = 1; // new key always resets minFreq to 1
  }
}
