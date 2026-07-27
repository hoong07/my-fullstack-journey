#include<stdio.h>
#include<stdlib.h>

#define NAMESIZE 20

typedef struct BROTHERNODE //兄弟节点
{
    char node;
    struct BROTHERNODE* next;
}BROTHERNODE;
typedef BROTHERNODE* BROTHER;

// 双亲结点
typedef struct PARENTNODE
{
    char node;
    BROTHER child;
}PARENTNODE;
typedef PARENTNODE* PARENT;

// 树分支节点
typedef struct TREENODE
{
    PARENT node;
    struct TREENODE* next;
}TREENODE;
typedef TREENODE* TREE;

// 原有栈结构 用于查找
typedef struct STACKNODE
{
    char name;
    struct STACKNODE* next;
} STACKNODE;
typedef STACKNODE* STACK;

// 存储从根到目标节点的搜索路径
typedef struct PATHNODE
{
    char node;              // 路径中的节点名
    struct PATHNODE* next;  // 指向路径中下一个节点
} PATHNODE;
typedef PATHNODE* PATHSTACK;


BROTHER appendBrotherNode(BROTHER br, char node)
{
    BROTHER p1 = (BROTHER)malloc(sizeof(BROTHERNODE));
    p1->node = node;
    p1->next = NULL;

    if (!br)
        return p1;

    BROTHER p2 = br;
    while (p2->next)
        p2 = p2->next;
    p2->next = p1;
    return br;
}

TREE CreatTree(char parnode, BROTHER br)
{
    TREE root = (TREE)malloc(sizeof(TREENODE));
    root->node = (PARENT)malloc(sizeof(PARENTNODE));
    root->node->node = parnode;
    root->node->child = br;
    root->next = NULL;
    return root;
}

TREE addTree(TREE tree, TREE newtree)
{
    TREE root = tree;
    if (!tree)
    {
        tree = newtree;
    }
    else
    {
        while (root->next)
            root = root->next;
        root->next = newtree;
    }
    return tree;
}

BROTHER clearBrother(BROTHER br)
{
    BROTHER ptr = br;
    while (br)
    {
        ptr = br;
        br = br->next;
        free(ptr);
    }
    return br;
}

TREE clearTree(TREE root)
{
    TREE ptr;
    while (root)
    {
        ptr = root;
        root = root->next;
        if (ptr->node)
        {
            clearBrother(ptr->node->child);
            free(ptr->node);
        }
        free(ptr);
    }
    return NULL;
}

BROTHER creatBrotherList(BROTHER rbrother, char* input)
{
    for (int i = 0; input[i] != '\0'; i++)
    {
        if (input[i] != '/')
            rbrother = appendBrotherNode(rbrother, input[i]);
    }
    return rbrother;
}

// 栈操作
STACK push(STACK stack, const char name)
{
    STACK newNode = (STACK)malloc(sizeof(STACKNODE));
    newNode->name = name;
    newNode->next = stack;
    return newNode;
}

STACK pop(STACK stack, char* name)
{
    if (stack == NULL)
        return NULL;
    STACK temp = stack;
    *name = temp->name;
    stack = stack->next;
    free(temp);
    return stack;
}

int isEmpty(STACK stack)
{
    return stack == NULL;
}

void printPath(STACK path)
{
    if (!path) return;
    printf("%c", path->name);
    path = path->next;
    while (path)
    {
        printf("->%c", path->name);
        path = path->next;
    }
    printf("\n");
}

char findParent(TREE tree, char node)
{
    TREE cur = tree;
    while (cur)
    {
        BROTHER bro = cur->node->child;
        while (bro)
        {
            if (bro->node == node)
                return cur->node->node;
            bro = bro->next;
        }
        cur = cur->next;
    }
    return '\0';
}

// 回溯搜索输出函数
void mySearchInTree(TREE tree, char target)
{
    if (tree == NULL)
    {
        printf("not found\n");
        return;
    }
    STACK stack = NULL;
    stack = push(stack, tree->node->node);
    int found = 0;
    char currentName;

    while (!isEmpty(stack))
    {
        stack = pop(stack, &currentName);

        if (currentName == target)
        {
            found = 1;
            while (!isEmpty(stack))
                stack = pop(stack, &currentName);
            break;
        }

        TREE cur = tree;
        while (cur != NULL)
        {
            if (cur->node->node == currentName)
            {
                BROTHER child = cur->node->child;
                while (child != NULL)
                {
                    stack = push(stack, child->node);
                    child = child->next;
                }
                break;
            }
            cur = cur->next;
        }
    }

    if (!found)
    {
        printf("not found\n");
        return;
    }

    // 回溯路径
    STACK path = NULL;
    char cur = target;
    while (cur != '\0')
    {
        path = push(path, cur);
        cur = findParent(tree, cur);
    }
    printPath(path);
}


// 路径栈操作函数

// 路径入栈
PATHSTACK pushPath(PATHSTACK stack, char node)
{
    PATHSTACK newNode = (PATHSTACK)malloc(sizeof(PATHNODE));
    newNode->node = node;
    newNode->next = stack;
    return newNode;
}

// 路径出栈
PATHSTACK popPath(PATHSTACK stack, char* node)
{
    if (!stack) return NULL;
    *node = stack->node;
    PATHSTACK temp = stack;
    stack = stack->next;
    free(temp);
    return stack;
}

// 释放整个路径栈
void freePathStack(PATHSTACK stack)
{
    char ch;
    while (stack)
        stack = popPath(stack, &ch);
}

// 打印路径（从根到目标的正序输出）
void printSearchPath(PATHSTACK path)
{
    if (!path) return;
    // 路径栈中 栈顶=目标 栈底=根 需要逆序输出
    char nodes[100];
    int count = 0;
    PATHSTACK temp = path;
    while (temp)
    {
        nodes[count++] = temp->node;
        temp = temp->next;
    }
    for (int i = count - 1; i >= 0; i--)
    {
        printf("%c", nodes[i]);
        if (i > 0) printf("->");
    }
    printf("\n");
}



// 递归DFS辅助函数  1=找到 0=未找到
int dfsHelper(TREE tree, char current, char target, PATHSTACK* path)
{
    // 当前节点入路径栈
    *path = pushPath(*path, current);

    // 找到目标
    if (current == target)
        return 1;

    // 在树中查找当前节点，遍历其子节点
    TREE cur = tree;
    while (cur)
    {
        if (cur->node->node == current)
        {
            BROTHER child = cur->node->child;
            while (child)
            {
                // 递归搜索子节点
                if (dfsHelper(tree, child->node, target, path))
                    return 1;  // 在子树中找到，路径已保留
                child = child->next;
            }
            break;
        }
        cur = cur->next;
    }

    // 该分支未找到，回溯：弹出当前节点
    char dummy;
    *path = popPath(*path, &dummy);
    return 0;
}

// 通用栈路径搜索函数
//   利用DFS + 路径栈，找到目标时路径栈中即为完整路径
void commonSearch(TREE tree, char target)
{
    if (!tree)
    {
        printf("not found\n");
        return;
    }

    PATHSTACK path = NULL;
    if (dfsHelper(tree, tree->node->node, target, &path))
        printSearchPath(path);
    else
        printf("not found\n");

    freePathStack(path);
}



int main()
{
    TREE tree = NULL;
    char target;
    int n;

    //  控制台输入

    // scanf("%d", &n);
    // for (int i = 0; i < n; i++)
    // {
    //     char parentName;
    //     char childStr[NAMESIZE];
    //     scanf(" %c", &parentName); //跳过换行
    //     scanf("%s", childStr);
    //     BROTHER br = NULL;
    //     br = creatBrotherList(br, childStr);
    //     TREE newtree = CreatTree(parentName, br);
    //     tree = addTree(tree, newtree);
    // }
    // scanf(" %c", &target);

    
        // 文件读取输入

    FILE* fp = fopen("tree.txt", "r");
    if (!fp)
    {
        printf("无法打开文件\n");
        return 1;
    }
    fscanf(fp, "%d", &n);
    for (int i = 0; i < n; i++)
    {
        char parentName;
        char childStr[NAMESIZE];
        fscanf(fp, " %c", &parentName);
        fscanf(fp, "%s", childStr);
        BROTHER br = NULL;
        br = creatBrotherList(br, childStr);
        TREE newtree = CreatTree(parentName, br);
        tree = addTree(tree, newtree);
    }
    fscanf(fp, " %c", &target);
    fclose(fp);
    

    // 搜索方式一：栈路径搜索
    // commonSearch(tree, target);

    // 搜索方式二：我的回溯搜索路径输出
    mySearchInTree(tree, target);

    

    clearTree(tree);
    return 0;
}