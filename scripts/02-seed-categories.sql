-- Insert job categories with job counts
INSERT INTO job_categories (name_ru, name_tj, name_en, slug, icon, color, job_count, sort_order) VALUES
('IT и разработка', 'IT ва таҳия', 'IT & Development', 'it-development', 'Code', '#3B82F6', 245, 1),
('Дизайн', 'Дизайн', 'Design', 'design', 'Palette', '#8B5CF6', 89, 2),
('Маркетинг', 'Маркетинг', 'Marketing', 'marketing', 'TrendingUp', '#10B981', 156, 3),
('Продажи', 'Фурӯш', 'Sales', 'sales', 'ShoppingCart', '#F59E0B', 203, 4),
('Финансы', 'Молия', 'Finance', 'finance', 'DollarSign', '#EF4444', 78, 5),
('Образование', 'Маориф', 'Education', 'education', 'GraduationCap', '#06B6D4', 134, 6),
('Медицина', 'Тиб', 'Healthcare', 'healthcare', 'Heart', '#EC4899', 167, 7),
('Управление', 'Идора', 'Management', 'management', 'Users', '#84CC16', 92, 8),
('Строительство', 'Сохтмон', 'Construction', 'construction', 'Building', '#F97316', 123, 9),
('Транспорт', 'Нақлиёт', 'Transportation', 'transportation', 'Truck', '#6366F1', 67, 10),
('Туризм', 'Туризм', 'Tourism', 'tourism', 'MapPin', '#14B8A6', 45, 11),
('Ресторан', 'Ресторан', 'Restaurant', 'restaurant', 'UtensilsCrossed', '#F43F5E', 89, 12)
ON CONFLICT (slug) DO UPDATE SET
    name_ru = EXCLUDED.name_ru,
    job_count = EXCLUDED.job_count,
    color = EXCLUDED.color,
    sort_order = EXCLUDED.sort_order;
