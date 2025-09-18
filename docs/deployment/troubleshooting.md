# Troubleshooting Guide

## 🐛 Common Issues & Solutions

### Metro Runtime Error
**Error**: `Unable to resolve "@expo/metro-runtime" from "node_modules/expo-router/entry-classic.js"`

**Solution**:
```bash
# Install missing metro runtime
npm install @expo/metro-runtime --legacy-peer-deps

# Update Expo packages to correct versions
npm install expo@54.0.7 expo-router@~6.0.5 --legacy-peer-deps

# Clear cache and restart
npx expo start -c
```

### Tamagui Peer Dependency Warnings
**Issue**: React Native version conflicts with Tamagui packages

**Solution**: Use `--legacy-peer-deps` flag for all npm installations:
```bash
npm install [package-name] --legacy-peer-deps
```

### Bundle Cache Issues
**Symptoms**: App not reflecting changes, build errors

**Solution**:
```bash
# Clear all caches
npx expo start -c

# Or clear specific caches
rm -rf node_modules/.cache
rm -rf .expo
npm start
```

### TypeScript Errors with Tamagui
**Issue**: Import or type errors with Tamagui components

**Solutions**:
1. Ensure `tamagui.config.ts` is properly configured
2. Check TypeScript module declarations
3. Restart TypeScript language server

### iOS Simulator Issues
**Issue**: App not loading on iOS simulator

**Steps**:
1. Stop development server
2. Clear cache: `npx expo start -c`
3. Reset simulator: Device > Erase All Content and Settings
4. Restart development server

### Hot Reload Not Working
**Solution**:
```bash
# Restart with cache clear
npx expo start -c

# Check Metro configuration
# Ensure proper babel.config.js setup
```

## 📱 Platform-Specific Issues

### iOS Development
- Ensure Xcode is properly installed
- Check iOS Simulator is running
- Verify iOS deployment target compatibility

### Android Development
- Ensure Android Studio is installed
- Check Android SDK configuration
- Verify Android emulator is running

### Web Development
- Check browser console for errors
- Ensure CSS support is enabled in metro.config.js
- Verify web dependencies are installed

---

For more help, check the [FAQ](../resources/faq.md) or [Contributing Guide](../resources/contributing.md).