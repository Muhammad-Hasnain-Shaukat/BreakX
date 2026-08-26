import os
import math
import numpy as np
from PIL import Image, ImageEnhance, ImageFilter, ImageOps

def create_super_crystal_light_theme_assets():
    script_dir = os.path.dirname(os.path.abspath(__file__))
    base_dir = os.path.abspath(os.path.join(script_dir, '..', '..'))
    public_dir = os.path.join(base_dir, 'public')
    
    hero_x_path = os.path.join(public_dir, 'hero-x.jpg')
    hero_full_path = os.path.join(public_dir, 'hero-full-bg.jpg')
    
    out_x_path = os.path.join(public_dir, 'hero-x-light.jpg')
    out_full_path = os.path.join(public_dir, 'hero-full-bg-light.jpg')
    
    print(f"Refining crystal definition for {hero_x_path}...")
    img_x = Image.open(hero_x_path).convert('RGB')
    arr = np.array(img_x, dtype=np.float32) / 255.0
    
    # Luminance
    lum = arr[:, :, 0] * 0.299 + arr[:, :, 1] * 0.587 + arr[:, :, 2] * 0.114
    
    # 1. Base light pearl/snow backdrop (#F8FAFC)
    bg_r = 0.975
    bg_g = 0.980
    bg_b = 0.990
    
    out = np.zeros_like(arr)
    for c, bg_val in enumerate([bg_r, bg_g, bg_b]):
        out[:, :, c] = bg_val
        
    # 2. Geometric facet contrast:
    # High-tech glass facets have refraction indices that create vivid royal blue / cyan internal reflections
    facet_mask = np.clip((lum - 0.05) / 0.35, 0.0, 1.0)
    facet_mask = np.sin(facet_mask * np.pi * 0.5)
    
    # 3. Core starburst glow (top 35% of luminance)
    core_mask = np.clip((lum - 0.45) / 0.55, 0.0, 1.0)
    core_mask = np.power(core_mask, 1.5)
    
    # Refract facets with rich sapphire (#1D4ED8), cyan (#06B6D4), and electric indigo
    # We darken the glass body slightly to reveal the gorgeous crystal facets, while tinting with royal electric blue
    out[:, :, 0] = out[:, :, 0] * (1.0 - facet_mask * 0.65) + (arr[:, :, 0] * 0.4) * facet_mask
    out[:, :, 1] = out[:, :, 1] * (1.0 - facet_mask * 0.50) + (arr[:, :, 1] * 0.6) * facet_mask
    out[:, :, 2] = out[:, :, 2] * (1.0 - facet_mask * 0.20) + (arr[:, :, 2] * 1.1) * facet_mask
    
    # Add dazzling diamond sparkle to the core
    out[:, :, 0] = np.clip(out[:, :, 0] + core_mask * 0.90, 0.0, 1.0)
    out[:, :, 1] = np.clip(out[:, :, 1] + core_mask * 0.92, 0.0, 1.0)
    out[:, :, 2] = np.clip(out[:, :, 2] + core_mask * 0.98, 0.0, 1.0)
    
    out_img = Image.fromarray((out * 255.0).astype(np.uint8))
    # Delicate bloom
    bloom = out_img.filter(ImageFilter.GaussianBlur(radius=1.2))
    final_x = Image.blend(out_img, bloom, 0.15)
    final_x.save(out_x_path, 'JPEG', quality=98)
    print(f"Saved refined {out_x_path}!")
    
    # 4. Widescreen Hero Full Background
    if os.path.exists(hero_full_path):
        print(f"Refining widescreen {hero_full_path}...")
        img_full = Image.open(hero_full_path).convert('RGB')
        arr_f = np.array(img_full, dtype=np.float32) / 255.0
        lum_f = arr_f[:, :, 0] * 0.299 + arr_f[:, :, 1] * 0.587 + arr_f[:, :, 2] * 0.114
        
        out_f = np.zeros_like(arr_f)
        for c, bg_val in enumerate([bg_r, bg_g, bg_b]):
            out_f[:, :, c] = bg_val
            
        facet_mask_f = np.clip((lum_f - 0.045) / 0.35, 0.0, 1.0)
        facet_mask_f = np.sin(facet_mask_f * np.pi * 0.5)
        
        core_mask_f = np.clip((lum_f - 0.45) / 0.55, 0.0, 1.0)
        core_mask_f = np.power(core_mask_f, 1.5)
        
        out_f[:, :, 0] = out_f[:, :, 0] * (1.0 - facet_mask_f * 0.65) + (arr_f[:, :, 0] * 0.4) * facet_mask_f
        out_f[:, :, 1] = out_f[:, :, 1] * (1.0 - facet_mask_f * 0.50) + (arr_f[:, :, 1] * 0.6) * facet_mask_f
        out_f[:, :, 2] = out_f[:, :, 2] * (1.0 - facet_mask_f * 0.20) + (arr_f[:, :, 2] * 1.1) * facet_mask_f
        
        out_f[:, :, 0] = np.clip(out_f[:, :, 0] + core_mask_f * 0.90, 0.0, 1.0)
        out_f[:, :, 1] = np.clip(out_f[:, :, 1] + core_mask_f * 0.92, 0.0, 1.0)
        out_f[:, :, 2] = np.clip(out_f[:, :, 2] + core_mask_f * 0.98, 0.0, 1.0)
        
        out_full_img = Image.fromarray((out_f * 255.0).astype(np.uint8))
        bloom_f = out_full_img.filter(ImageFilter.GaussianBlur(radius=1.2))
        final_f = Image.blend(out_full_img, bloom_f, 0.15)
        final_f.save(out_full_path, 'JPEG', quality=95)
        print(f"Saved refined {out_full_path}!")

if __name__ == '__main__':
    create_super_crystal_light_theme_assets()
