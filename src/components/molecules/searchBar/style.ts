import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  searchWrapper: {
    position: 'relative',
    marginTop: 16,
  },
  searchInput: {
    padding: 10,
    paddingRight: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
  },
  filterBadge: {
    position: 'absolute',
    top: -2,
    right: -2,
    backgroundColor: 'red',
    width: 12,
    height: 12,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterBadgeText: {
    color: '#fff',
    fontSize: 8,
    fontWeight: 'bold',
  },
  filterIconWrapper: {
    position: 'absolute',
    right: 10,
    top: '50%',
    transform: [{translateY: -12}],
  },
  filterIcon: {
    fontSize: 18,
    color: '#444',
  },
});
